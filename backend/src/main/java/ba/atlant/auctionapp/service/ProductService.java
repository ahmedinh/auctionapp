package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.error.Error;
import ba.atlant.auctionapp.model.Category;
import ba.atlant.auctionapp.model.Product;
import ba.atlant.auctionapp.model.User;
import ba.atlant.auctionapp.repository.CategoryRepository;
import ba.atlant.auctionapp.repository.ProductRepository;
import ba.atlant.auctionapp.repository.UserRepository;
import ba.atlant.auctionapp.service.exception.ServiceException;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        return ResponseEntity.status(HttpStatus.OK).body(productPage);
    }

    public ResponseEntity getLastChance(int page, int size) {
        Page<Product> productPage = productRepository.findAll(
                PageRequest.of(page, size, Sort.by("auctionEnd").ascending()));
        return ResponseEntity.status(HttpStatus.OK).body(productPage);
    }

    public ResponseEntity getHighlighted() {
        Optional<Product> optionalProduct = productRepository.findById(9L);
        if (optionalProduct.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Error.objectNotFoundID("Product"));
        Product product = optionalProduct.get();
        return ResponseEntity.status(HttpStatus.OK).body(product);
    }
}