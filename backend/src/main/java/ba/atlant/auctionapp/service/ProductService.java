package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.config.CustomMultipartFile;
import ba.atlant.auctionapp.config.jwt.JwtUtils;
import ba.atlant.auctionapp.dto.ProductCreationDTO;
import ba.atlant.auctionapp.dto.ProductDTO;
import ba.atlant.auctionapp.exception.ServiceException;
import ba.atlant.auctionapp.model.*;
import ba.atlant.auctionapp.projection.ProductProjection;
import ba.atlant.auctionapp.projection.ProductUserProjection;
import ba.atlant.auctionapp.projection.SubCategoryProjection;
import ba.atlant.auctionapp.repository.*;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.math.BigDecimal;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final SubCategoryRepository subCategoryRepository;
    private final ProductPictureRepository productPictureRepository;
    private final PersonRepository personRepository;
    private final CategoryRepository categoryRepository;
    private final BidRepository bidRepository;
    private final S3Service s3Service;
    private final JwtUtils jwtUtils;

    public ProductService(ProductRepository productRepository, SubCategoryRepository subCategoryRepository, ProductPictureRepository productPictureRepository, PersonRepository personRepository, CategoryRepository categoryRepository, BidRepository bidRepository, JwtUtils jwtUtils, S3Service s3Service) {
        this.productRepository = productRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.productPictureRepository = productPictureRepository;
        this.personRepository = personRepository;
        this.categoryRepository = categoryRepository;
        this.bidRepository = bidRepository;
        this.s3Service = s3Service;
        this.jwtUtils = jwtUtils;
    }

    @Transactional
    public ResponseEntity<Product> addProduct(ProductCreationDTO productCreationDTO, String authHeader) {
        try {
            if (productRepository.findByName(productCreationDTO.getName()).isPresent())
                throw new IllegalArgumentException("Product with provided name already exists.");
            Category category = categoryRepository.findByName(productCreationDTO.getSelectedCategory()).orElseThrow(() -> new ResourceNotFoundException("Category not found for given ID."));
            SubCategory subCategory = subCategoryRepository.findByNameAndCategory(productCreationDTO.getSelectedSubcategory(), category).orElseThrow(() -> new ResourceNotFoundException("SubCategory not found for given ID."));
            Long userId = Long.valueOf(jwtUtils.getUserIdFromJwtToken(authHeader.substring(7)));
            Person person = personRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Person not found for given ID."));
            if (!subCategory.getCategory().equals(category))
                throw new ResourceNotFoundException("Provided category does not contain provided subcategory.");
            Product product = new Product(productCreationDTO, person, subCategory);
            productRepository.save(product);
            return ResponseEntity.ok(product);
        } catch (DataAccessException e) {
            throw new ServiceException("Database access error occurred", e);
        }
    }

    public ResponseEntity<Page<ProductProjection>> getNewArrivals(int page, int size) {
        Page<ProductProjection> productProjectionPage = productRepository.getNewArrivalsProducts(PageRequest.of(page,size));
        return ResponseEntity.ok(productProjectionPage);
    }

    public ResponseEntity<Page<ProductProjection>> getLastChance(int page, int size) {
        Page<ProductProjection> productProjectionPage = productRepository.getLastChanceProducts(PageRequest.of(page,size));
        return ResponseEntity.ok(productProjectionPage);
    }

    public ResponseEntity<ProductDTO> getHighlighted() {
        Product product = productRepository.findById(9L).orElseThrow(() -> new ResourceNotFoundException("Product not found for given ID."));
        return ResponseEntity.ok(new ProductDTO(product, productPictureRepository.findAllByProductId(9L)));
    }

    public ResponseEntity<ProductDTO> getProduct(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found for given ID."));
        List<ProductPicture> productPictureList = productPictureRepository.findAllByProductId(id);
        List<Bid> bidList = bidRepository.findAllByProductId(id);
        if (bidList.isEmpty())
            return ResponseEntity.ok(new ProductDTO(product, productPictureList, BigDecimal.valueOf(0), 0));
        else
            return ResponseEntity.ok(new ProductDTO(product, productPictureList, bidList.stream().max(Comparator.comparing(Bid::getAmount)).get().getAmount(), bidList.size()));
    }

    public ResponseEntity<Page<ProductProjection>> getProductsForCategory(
            int page, int size, Long categoryId, String sortField, String sortDirection, List<Long> subCategoryIds, BigDecimal minPrice, BigDecimal maxPrice) {

        Pageable pageable = makeSortObject(page, size, sortField, sortDirection);

        boolean isAuctionEndSort = sortField.equalsIgnoreCase("auctionEnd");
        boolean isAllCategories = categoryId.equals(0L);
        Page<ProductProjection> products;

        if (isAllCategories) {
            products = isAuctionEndSort
                    ? productRepository.getProductsForAllCategoriesWithFutureAuctionEnd(subCategoryIds, minPrice, maxPrice, pageable)
                    : productRepository.getProductsForAllCategories(subCategoryIds, minPrice, maxPrice, pageable);
        } else {
            products = isAuctionEndSort
                    ? productRepository.getProductsForCategoryWithFutureAuctionEnd(categoryId, subCategoryIds, minPrice, maxPrice, pageable)
                    : productRepository.getProductsForCategory(categoryId, subCategoryIds, minPrice, maxPrice, pageable);
        }
        return ResponseEntity.ok(products);
    }

    public ResponseEntity<Page<ProductProjection>> getProductsForSubCategory(int page, int size, Long subCategoryId) {
        Page<ProductProjection> productProjectionPage = productRepository.getProductsForSubCategory(subCategoryId, PageRequest.of(page,size));
        return ResponseEntity.ok(productProjectionPage);
    }

    public ResponseEntity<Map<String, String>> getSuggestion(String query, Integer threshold) {
        String suggestion = productRepository.getSuggestion(query, threshold, -1);
        Map<String, String> response = Collections.singletonMap("name", suggestion);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<Page<ProductProjection>> searchProducts(
            int page, int size, String query, String sortField, String sortDirection, List<Long> subCategoryIds, BigDecimal minPrice, BigDecimal maxPrice) {
        Pageable pageable = makeSortObject(page, size, sortField, sortDirection);
        if (sortField.equalsIgnoreCase("auctionEnd"))
            return ResponseEntity.ok(productRepository.searchProductsWithFutureAuctionEnd(query, subCategoryIds, minPrice, maxPrice, pageable));
        else
            return ResponseEntity.ok(productRepository.searchProducts(query, subCategoryIds, minPrice, maxPrice, pageable));
    }

    private Pageable makeSortObject(int page, int size, String sortField, String sortDirection) {
        Sort sort = Sort.by("name").ascending();
        if (sortDirection.equalsIgnoreCase("asc")) {
            sort = Sort.by(sortField).ascending();
        } else if (sortDirection.equalsIgnoreCase("desc")) {
            sort = Sort.by(sortField).descending();
        }

        return PageRequest.of(page, size, sort);
    }

    @Transactional
    public ResponseEntity<List<ProductPicture>> addProductPictures(MultipartFile[] files, String productName) throws IOException {
        Product product = productRepository.findByName(productName).orElseThrow(() -> new ResourceNotFoundException("Product not found for given ID."));
        List<ProductPicture> productPictureList = new ArrayList<>();
        int counter = 1;
        for (MultipartFile file : files) {
            String pictureDefault = "picture_" + counter;
            s3Service.uploadFile(productName + "/" + pictureDefault + "/" + file.getOriginalFilename(), file);
            productPictureList.add(new ProductPicture(
                    productName + "/" + pictureDefault + "/" + file.getOriginalFilename(),
                    String.format("https://%s.s3.%s.amazonaws.com/%s/%s/%s",s3Service.getBucketName(),s3Service.getRegion(),productName,pictureDefault,file.getOriginalFilename()),
                    product
            ));
            counter++;
        }
        productPictureRepository.saveAll(productPictureList);
        return ResponseEntity.ok(productPictureList);
    }

    public ResponseEntity<List<ProductUserProjection>> activeUserProducts(Long userId) {
        personRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("No user found with provided ID."));
        return ResponseEntity.ok().body(productRepository.getActiveUserProducts(userId));
    }

    public ResponseEntity<List<ProductUserProjection>> soldUserProducts(Long userId) {
        personRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("No user found with provided ID."));
        return ResponseEntity.ok().body(productRepository.getSoldUserProducts(userId));
    }

    @Transactional
    public void deleteProduct(String productName) {
        Product product = productRepository.findByName(productName).orElseThrow(() -> new ResourceNotFoundException("Product with provided name is not found."));
        List<ProductPicture> pictures = productPictureRepository.findAllByProductId(product.getId());
        if (pictures != null && !pictures.isEmpty()) {
            for (ProductPicture productPicture : pictures)
                s3Service.deleteObject(productPicture.getName());
            productPictureRepository.deleteAll(pictures);
        }
        productRepository.delete(product);
    }

    public ResponseEntity<List<ProductProjection>> getRecommendedProducts(Long userId) {
        if (userId == null || bidRepository.getUserBids(userId).isEmpty()) {
            return ResponseEntity.ok(productRepository.getDefaultRecommendedProducts());
        }
        List<SubCategoryProjection> subCategoryListWithMostUserBids = subCategoryRepository.getSubCategoriesByMostUserBids(userId);
        List<ProductProjection> mostPopularProductsForUser = productRepository.getProductsFromPopularSubCategoryForUser(userId, subCategoryListWithMostUserBids.get(0).getId());

        List<ProductProjection> recommendedProducts = productRepository.getDefaultRecommendedProducts().subList(0,3);

        // Add first two products from mostPopularProductsForUser if available
        if (!mostPopularProductsForUser.isEmpty()) {
            recommendedProducts.set(0, mostPopularProductsForUser.get(0));
            if (mostPopularProductsForUser.size() >= 2)
                recommendedProducts.set(1, mostPopularProductsForUser.get(1));
        }

        // Add third product from secondMostPopularProductsForUser if available
        if (subCategoryListWithMostUserBids.size() > 1) {
            List<ProductProjection> secondMostPopularProductsForSubCategory = productRepository.getProductsFromPopularSubCategoryForUser(userId, subCategoryListWithMostUserBids.get(1).getId());
            if (!secondMostPopularProductsForSubCategory.isEmpty())
                recommendedProducts.set(2, secondMostPopularProductsForSubCategory.get(0));
        }
        return ResponseEntity.ok(recommendedProducts);
    }

    public ResponseEntity<List<ProductProjection>> getSimilarProducts(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product not found with provided ID."));
        return ResponseEntity.ok(productRepository.getSimilarProducts(productId, product.getSubCategory().getCategory().getId()));
    }

    @Transactional
    public ResponseEntity<?> addProductsWithCSV(String authHeader, MultipartFile file) {
        if (file.isEmpty())
            throw new ResourceNotFoundException("File is empty");
        Long userId = Long.valueOf(jwtUtils.getUserIdFromJwtToken(authHeader.substring(7)));
        try (BufferedReader fileReader = new BufferedReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
             CSVParser csvParser = new CSVParser(fileReader, CSVFormat.DEFAULT.withFirstRecordAsHeader())) {
            List<Product> productList = new ArrayList<>();
            String[] requiredFields = {"Name", "Description", "Price", "Category", "SubCategory", "AuctionStart", "AuctionEnd", "PictureURLs"};
            Person person = personRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("No person found for provided ID"));

            for (CSVRecord csvRecord : csvParser) {
                Map<String, String> recordMap = csvRecord.toMap();

                for (String field : requiredFields) {
                    if (recordMap.get(field).trim().isEmpty()) {
                        throw new IllegalArgumentException("Missing data in column " + field.toUpperCase() + " in row " + csvRecord.getRecordNumber());
                    }
                }

                String name = recordMap.get("Name").trim();
                String description = recordMap.get("Description").trim();
                BigDecimal price = BigDecimal.valueOf(Double.parseDouble(recordMap.get("Price").trim()));
                Category category = categoryRepository.findByName(recordMap.get("Category").trim()).orElseThrow(() -> new ResourceNotFoundException("Category not found for given name in row " + csvRecord.getRecordNumber()));
                SubCategory subCategory = subCategoryRepository.findByNameAndCategory(recordMap.get("SubCategory").trim(), category).orElseThrow(() -> new ResourceNotFoundException("SubCategory not found for given name in row " + csvRecord.getRecordNumber()));
                LocalDate auctionStart = formatLocalDate(recordMap.get("AuctionStart").trim(), csvRecord.getRecordNumber());
                LocalDate auctionEnd = formatLocalDate(recordMap.get("AuctionEnd").trim(), csvRecord.getRecordNumber());

                validateFields(csvRecord, name, price, category, subCategory, auctionStart, auctionEnd);

                Product product = new Product(name, description, price, LocalDateTime.now(), auctionStart, auctionEnd, subCategory, person);
                productList.add(product);
                productRepository.save(product);

                String pictureUrls = recordMap.get("PictureURLs").trim();
                String[] urls = pictureUrls.split(",");
                MultipartFile[] multipartFiles = new MultipartFile[urls.length];
                for (int i = 0; i < urls.length; i++) {
                    multipartFiles[i] = downloadImageFromURL(i + 1, urls[i].trim());
                }
                this.addProductPictures(multipartFiles, product.getName());
            }
            return ResponseEntity.ok(productList);
        } catch (IOException e) {
            return new ResponseEntity<>("Error processing CSV file", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private void validateFields(CSVRecord csvRecord, String name, BigDecimal price, Category category, SubCategory subCategory, LocalDate auctionStart, LocalDate auctionEnd) {
        if (!subCategory.getCategory().getName().equals(category.getName()))
            throw new IllegalArgumentException("Category does not contain that subcategory in row " + csvRecord.getRecordNumber());
        if (price.compareTo(BigDecimal.valueOf(0)) < 0.5)
            throw new IllegalArgumentException("Price is negative in row " + csvRecord.getRecordNumber() + ". Price must be a positive number with 2 decimals.");
        if (productRepository.findByName(name).isPresent())
            throw new IllegalArgumentException("Product already exists with name in row " + csvRecord.getRecordNumber());
        if (auctionStart.isBefore(LocalDate.now()))
            throw new IllegalArgumentException("Start date for row " + csvRecord.getRecordNumber() + " cannot be in past");
        if (auctionEnd.isBefore(LocalDate.now()))
            throw new IllegalArgumentException("End date for row " + csvRecord.getRecordNumber() + " cannot be in past");
        if (auctionEnd.isBefore(auctionStart.plusDays(1)))
            throw new IllegalArgumentException("End date for row " + csvRecord.getRecordNumber() + " cannot be before start date");
    }

    private LocalDate formatLocalDate(String stringDate, long recordNumber) {
        List<String> datePatterns = Arrays.asList(
                "MM/dd/yyyy",
                "M/dd/yyyy"
        );
        for (String pattern : datePatterns) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
            try {
                return LocalDate.parse(stringDate, formatter);
            } catch (Exception e) {
                System.out.println("Failed to parse date with pattern: " + pattern);
            }
        }
        throw new IllegalArgumentException("Unable to parse string to any valid format date in row " + recordNumber);
    }

    private static MultipartFile downloadImageFromURL(Integer number, String url) throws IOException {
        URL imageUrl = new URL(url);
        try (InputStream in = imageUrl.openStream(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[1024];
            int n;
            while ((n = in.read(buffer)) != -1) {
                out.write(buffer, 0, n);
            }
            byte[] imageBytes = out.toByteArray();
            return new CustomMultipartFile(imageBytes, "picture_" + number + ".jpg", "image/jpeg");
        }
    }

    public ResponseEntity<Map<String, BigDecimal>> getMaxPriceForProducts() {
        Map<String, BigDecimal> prices = new HashMap<>();
        prices.put("max_price",productRepository.getMaxStartPrice());
        prices.put("min_price",productRepository.getMinStartPrice());
        return ResponseEntity.ok(prices);
    }
}