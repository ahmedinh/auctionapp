package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.config.jwt.JwtUtils;
import ba.atlant.auctionapp.dto.ProductCreationDTO;
import ba.atlant.auctionapp.dto.ProductDTO;
import ba.atlant.auctionapp.exception.ServiceException;
import ba.atlant.auctionapp.model.*;
import ba.atlant.auctionapp.projection.ProductProjection;
import ba.atlant.auctionapp.projection.ProductUserProjection;
import ba.atlant.auctionapp.projection.SubCategoryProjection;
import ba.atlant.auctionapp.repository.*;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
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
            int page, int size, Long categoryId, String sortField, String sortDirection) {

        Pageable pageable = makeSortObject(page, size, sortField, sortDirection);
        if (sortField.equalsIgnoreCase("auctionEnd"))
            return ResponseEntity.ok(productRepository.getProductsForCategoryWithFutureAuctionEnd(categoryId, pageable));
        else
            return ResponseEntity.ok(productRepository.getProductsForCategory(categoryId, pageable));
    }

    public ResponseEntity<Page<ProductProjection>> getProductsForSubCategory(int page, int size, Long subCategoryId) {
        Page<ProductProjection> productProjectionPage = productRepository.getProductsForSubCategory(subCategoryId, PageRequest.of(page,size));
        return ResponseEntity.ok(productProjectionPage);
    }

    public ResponseEntity<Map<String, String>> getSuggestion(String query, Integer threshold) {
        String suggestion = productRepository.getSuggestion(query, threshold, 0);
        Map<String, String> response = Collections.singletonMap("name", suggestion);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<Page<ProductProjection>> searchProducts(
            int page, int size, String query, String sortField, String sortDirection) {
        Pageable pageable = makeSortObject(page, size, sortField, sortDirection);
        if (sortField.equalsIgnoreCase("auctionEnd"))
            return ResponseEntity.ok(productRepository.searchProductsWithFutureAuctionEnd(query, pageable));
        else
            return ResponseEntity.ok(productRepository.searchProducts(query, pageable));
    }

    private Pageable makeSortObject(int page, int size, String sortField, String sortDirection) {
        Sort sort = Sort.by(sortField).ascending();
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
        for (MultipartFile file : files) {
            s3Service.uploadFile(productName + "/" + file.getOriginalFilename(), file);
            productPictureList.add(new ProductPicture(
                    productName + "/" + file.getOriginalFilename(),
                    String.format("https://%s.s3.%s.amazonaws.com/%s/%s",s3Service.getBucketName(),s3Service.getRegion(),productName,file.getOriginalFilename()),
                    product
            ));
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
            for (ProductPicture productPicture : pictures) {
                s3Service.deleteObject(productPicture.getUrl());
            }
            s3Service.deleteObject(String.format("https://%s.s3.%s.amazonaws.com/%s",s3Service.getBucketName(),s3Service.getRegion(),productName));
            productPictureRepository.deleteAll(pictures);
        }
        productRepository.delete(product);
    }

    public ResponseEntity getRecommendedProducts(Long userId) {
        if (userId == null || bidRepository.getUserBids(userId).isEmpty()) {
            return ResponseEntity.ok(productRepository.getRecommendedProductsNotLogged());
        }
        List<SubCategoryProjection> subCategoryProjectionList = subCategoryRepository.getSubCategoriesByMostUserBids(userId);
        List<ProductProjection> productProjectionList1 = productRepository.getProductsFromPopularSubCategoryForUser(userId, subCategoryProjectionList.get(0).getId());

        // List to hold the final selection of products
        List<ProductProjection> recommendedProducts = new ArrayList<>();

        // Add first two products from productProjectionList1 if available
        if (productProjectionList1.size() >= 2) {
            recommendedProducts.add(productProjectionList1.get(0));
            recommendedProducts.add(productProjectionList1.get(1));
        } else if (!productProjectionList1.isEmpty()) {
            // If there is at least one product, add it
            recommendedProducts.add(productProjectionList1.get(0));
        }

        // Check if there is a second subcategory
        if (subCategoryProjectionList.size() > 1) {
            List<ProductProjection> productProjectionList2 = productRepository.getProductsFromPopularSubCategoryForUser(userId, subCategoryProjectionList.get(1).getId());
            // Add the first product from productProjectionList2 if available
            if (!productProjectionList2.isEmpty())
                recommendedProducts.add(productProjectionList2.get(0));
        }

        while (recommendedProducts.size() < 3) {
            List<ProductProjection> additionalProducts = productRepository.getRecommendedProductsNotLogged();
            for (ProductProjection product : additionalProducts) {
                if (recommendedProducts.size() >= 3)
                    break;
                if (!recommendedProducts.contains(product))
                    recommendedProducts.add(product);
            }
            if (additionalProducts.isEmpty())
                break;
        }
        return ResponseEntity.ok(recommendedProducts);
    }
}