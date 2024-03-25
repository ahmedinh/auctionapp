package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.model.Category;
import ba.atlant.auctionapp.model.Product;
import ba.atlant.auctionapp.model.User;
import ba.atlant.auctionapp.repository.CategoryRepository;
import ba.atlant.auctionapp.repository.ProductPictureRepository;
import ba.atlant.auctionapp.repository.ProductRepository;
import ba.atlant.auctionapp.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

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


    public ResponseEntity getProducts() {
        List<Product> productList = productRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(productList);
    }

    public ResponseEntity getNewArrivals() {
        List<Product> productList = productRepository.findAll();
        productList.sort((p1, p2) -> p2.getCreatedAt().compareTo(p1.getCreatedAt()));
        return ResponseEntity.status(HttpStatus.OK).body(productJson(productList));
    }

    public ResponseEntity getLastChance() {
        List<Product> productList = productRepository.findAll();
        productList.sort(Comparator.comparing(Product::getAuctionEnd));
        return ResponseEntity.status(HttpStatus.OK).body(productJson(productList));
    }

    private ArrayNode productJson(List<Product> productList) {
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

    private ObjectNode objectNode(Product product) {
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
            return ResponseEntity.status(HttpStatus.OK).body(objectNode(product));
        }
        return null;
    }
}