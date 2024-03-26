package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.error.Error;
import ba.atlant.auctionapp.model.Category;
import ba.atlant.auctionapp.model.Product;
import ba.atlant.auctionapp.model.User;
import ba.atlant.auctionapp.repository.CategoryRepository;
import ba.atlant.auctionapp.repository.ProductRepository;
import ba.atlant.auctionapp.repository.UserRepository;
import ba.atlant.auctionapp.service.exception.ServiceException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository, UserRepository userRepository, ObjectMapper objectMapper) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public ResponseEntity addProduct(Product product) {
        try {
            Optional<Category> optionalCategory = categoryRepository.findById(product.getCategory().getId());
            if (optionalCategory.isEmpty())
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Error.objectNotFoundID("Category"));

            Optional<User> optionalUser = userRepository.findById(product.getUser().getId());
            if (optionalUser.isEmpty())
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Error.objectNotFoundID("User"));

            productRepository.save(product);
            return ResponseEntity.status(HttpStatus.OK).body("{\"id\":" + product.getId() + "}");
        } catch (DataAccessException e) {
            throw new ServiceException("Database access error occurred", e);
        } catch (Exception e) {
            throw new ServiceException("An unexpected error occurred", e);
        }
    }

    public ResponseEntity getProducts() {
        List<Product> productList = productRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(productList);
    }

    public ResponseEntity getNewArrivals(int page, int size) {
        Page<Product> productPage = productRepository.findAll(
                PageRequest.of(page, size, Sort.by("createdAt").descending()));
        return productJsonPaging(productPage);
    }

    public ResponseEntity getLastChance(int page, int size) {
        Page<Product> productPage = productRepository.findAll(
                PageRequest.of(page, size, Sort.by("auctionEnd").ascending()));
        return productJsonPaging(productPage);
    }

    private ResponseEntity productJsonPaging(Page<Product> productPage) {
        List<Product> productList = productPage.getContent();
        Map<String, Object> response = new HashMap<>();
        response.put("content", productJsonArray(productList));
        response.put("currentPage", productPage.getNumber());
        response.put("totalItems", productPage.getTotalElements());
        response.put("totalPages", productPage.getTotalPages());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    private ArrayNode productJsonArray(List<Product> productList) {
        ArrayNode arrayNode = objectMapper.createArrayNode();
        for (Product product: productList) {
            ObjectNode objectNode = objectMapper.createObjectNode();
            objectNode.put("id",product.getId());
            objectNode.put("name",product.getName());
            objectNode.put("description",product.getDescription());
            objectNode.put("start_price",product.getStartPrice());
            objectNode.put("created_at",product.getCreatedAt().format(DateTimeFormatter.ISO_DATE_TIME));
            objectNode.put("auction_start", product.getAuctionStart().format(DateTimeFormatter.ISO_DATE_TIME));
            objectNode.put("auction_end", product.getAuctionEnd().format(DateTimeFormatter.ISO_DATE_TIME));
            objectNode.put("size",product.getSize().name());
            objectNode.put("picture_url", product.getProductPictureList().get(0).getUrl());
            arrayNode.add(objectNode);
        }
        return arrayNode;
    }

    private ObjectNode productJsonObject(Product product) {
        ObjectNode objectNode = objectMapper.createObjectNode();
        objectNode.put("id",product.getId());
        objectNode.put("name", product.getName());
        objectNode.put("description",product.getDescription());
        objectNode.put("start_price",product.getStartPrice());
        objectNode.put("picture_url", product.getProductPictureList().get(0).getUrl());
        return objectNode;
    }

    public ResponseEntity getHighlighted() {
        Optional<Product> optionalProduct = productRepository.findById(9L);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            return ResponseEntity.status(HttpStatus.OK).body(productJsonObject(product));
        }
        return null;
    }
}