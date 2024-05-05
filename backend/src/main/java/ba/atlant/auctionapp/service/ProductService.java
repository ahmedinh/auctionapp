package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.dto.ProductCreationDTO;
import ba.atlant.auctionapp.dto.ProductDTO;
import ba.atlant.auctionapp.exception.ServiceException;
import ba.atlant.auctionapp.model.*;
import ba.atlant.auctionapp.projection.ProductProjection;
import ba.atlant.auctionapp.projection.ProductUserProjection;
import ba.atlant.auctionapp.repository.*;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    private final PersonService personService;
    private final S3Service s3Service;

    public ProductService(ProductRepository productRepository, SubCategoryRepository subCategoryRepository, ProductPictureRepository productPictureRepository, PersonRepository personRepository, CategoryRepository categoryRepository, BidRepository bidRepository, PersonService personService, S3Service s3Service) {
        this.productRepository = productRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.productPictureRepository = productPictureRepository;
        this.personRepository = personRepository;
        this.categoryRepository = categoryRepository;
        this.bidRepository = bidRepository;
        this.personService = personService;
        this.s3Service = s3Service;
    }

    @Transactional
    public ResponseEntity<Product> addProduct(ProductCreationDTO productCreationDTO, String authHeader) {
        System.out.println(productCreationDTO.getName());
        try {
            Optional<SubCategory> optionalSubCategory = subCategoryRepository.findByName(productCreationDTO.getSelectedSubcategory());
            if (optionalSubCategory.isEmpty())
                throw new IllegalArgumentException("SubCategory not found for provided name.");

            Integer userId = personService.getUserId(authHeader);
            Optional<Person> optionalPerson = personRepository.findById(Long.valueOf(userId));
            if (optionalPerson.isEmpty())
                throw new IllegalArgumentException("Person not found for given ID.");

            Optional<Category> optionalCategory = categoryRepository.findByName(productCreationDTO.getSelectedCategory());
            if (optionalCategory.isEmpty())
                throw new IllegalArgumentException("Category not found for provided name.");

            if (!optionalSubCategory.get().getCategory().equals(optionalCategory.get()))
                throw new IllegalArgumentException("Category does not contain that subcategory.");

            Product product = new Product(productCreationDTO, optionalPerson.get(), optionalSubCategory.get());
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
        Optional<Product> optionalProduct = productRepository.findById(9L);
        if (optionalProduct.isEmpty())
            throw new IllegalArgumentException("Product not found for given ID.");
        Product product = optionalProduct.get();
        return ResponseEntity.ok(new ProductDTO(product, productPictureRepository.findAllByProductId(9L)));
    }

    public ResponseEntity<ProductDTO> getProduct(Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isEmpty())
            throw new IllegalArgumentException("Product not found for given ID.");
        List<ProductPicture> productPictureList = productPictureRepository.findAllByProductId(id);
        List<Bid> bidList = bidRepository.findAllByProductId(id);
        if (bidList.isEmpty())
            return ResponseEntity.ok(new ProductDTO(optionalProduct.get(), productPictureList, BigDecimal.valueOf(0), 0));
        else
            return ResponseEntity.ok(new ProductDTO(optionalProduct.get(), productPictureList, bidList.stream().max(Comparator.comparing(Bid::getAmount)).get().getAmount(), bidList.size()));
    }

    public ResponseEntity<Page<ProductProjection>> getProductsForCategory(int page, int size, Long categoryId) {
        Page<ProductProjection> productProjectionPage = productRepository.getProductsForCategory(categoryId, PageRequest.of(page,size));
        return ResponseEntity.ok(productProjectionPage);
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

    public ResponseEntity<Page<ProductProjection>> searchProducts(int page, int size, String query) {
        return ResponseEntity.ok(productRepository.searchProducts(query, PageRequest.of(page,size)));
    }

    @Transactional
    public ResponseEntity<List<ProductPicture>> addProductPictures(MultipartFile[] files, String productName) throws IOException {
        System.out.println("Array length for files is: " + files.length);
        Optional<Product> optionalProduct = productRepository.findByName(productName);
        if (optionalProduct.isEmpty())
            throw new IllegalArgumentException("No product found with required name.");
        Product product = optionalProduct.get();
        List<ProductPicture> productPictureList = new ArrayList<>();
        for (MultipartFile file : files) {
            s3Service.uploadFile(file.getOriginalFilename(), file);
            productPictureList.add(new ProductPicture(
                    productName + "/" + file.getOriginalFilename(),
                    String.format("https://%s.s3.%s.amazonaws.com/%s",s3Service.getBucketName(),s3Service.getRegion(),file.getOriginalFilename()),
                    product
            ));
        }
        productPictureRepository.saveAll(productPictureList);
        return ResponseEntity.ok(productPictureList);
    }

    public ResponseEntity<List<ProductUserProjection>> activeUserProducts(Long userId) {
        if (personRepository.findById(userId).isEmpty())
            throw new IllegalArgumentException("No user found with provided ID.");
        return ResponseEntity.ok().body(productRepository.getActiveUserProducts(userId));
    }

    public ResponseEntity<List<ProductUserProjection>> soldUserProducts(Long userId) {
        if (personRepository.findById(userId).isEmpty())
            throw new IllegalArgumentException("No user found with provided ID.");
        return ResponseEntity.ok().body(productRepository.getSoldUserProducts(userId));
    }
}