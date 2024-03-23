package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.model.Category;
import ba.atlant.auctionapp.model.Product;
import ba.atlant.auctionapp.model.User;
import ba.atlant.auctionapp.repository.CategoryRepository;
import ba.atlant.auctionapp.repository.ProductRepository;
import ba.atlant.auctionapp.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    private final UserRepository userRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    public ResponseEntity getNewArrivals() {
        List<Product> productList = productRepository.findAll();
        productList.sort((p1, p2) -> p2.getCreatedAt().compareTo(p1.getCreatedAt()));
        return ResponseEntity.status(HttpStatus.OK).body(productList);
    }

    public ResponseEntity getLastChance() {
        List<Product> productList = productRepository.findAll();
        productList.sort(Comparator.comparing(Product::getAuctionEnd));
        return ResponseEntity.status(HttpStatus.OK).body(productList);
    }
}