package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.dto.ProductDTO;
import ba.atlant.auctionapp.error.Error;
import ba.atlant.auctionapp.model.*;
import ba.atlant.auctionapp.projection.ProductProjection;
import ba.atlant.auctionapp.repository.*;
import ba.atlant.auctionapp.service.exception.ServiceException;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final SubCategoryRepository subCategoryRepository;
    private final ProductPictureRepository productPictureRepository;
    private final UserRepository userRepository;
    private final BidRepository bidRepository;

    public ProductService(ProductRepository productRepository, SubCategoryRepository subCategoryRepository, ProductPictureRepository productPictureRepository, UserRepository userRepository, BidRepository bidRepository) {
        this.productRepository = productRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.productPictureRepository = productPictureRepository;
        this.userRepository = userRepository;
        this.bidRepository = bidRepository;
    }

    @Transactional
    public ResponseEntity addProduct(Product product) {
        try {
            Optional<SubCategory> optionalSubCategory = subCategoryRepository.findById(product.getSubCategory().getId());
            if (optionalSubCategory.isEmpty())
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Error.objectNotFoundID("SubCategory"));

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

    public ResponseEntity<Page<ProductProjection>> getNewArrivals(int page, int size) {
        Page<ProductProjection> productProjectionPage = productRepository.getNewArrivalsProducts(PageRequest.of(page,size));
        return ResponseEntity.status(HttpStatus.OK).body(productProjectionPage);
    }

    public ResponseEntity<Page<ProductProjection>> getLastChance(int page, int size) {
        Page<ProductProjection> productProjectionPage = productRepository.getLastChanceProducts(PageRequest.of(page,size));
        return ResponseEntity.status(HttpStatus.OK).body(productProjectionPage);
    }

    public ResponseEntity getHighlighted() {
        Optional<Product> optionalProduct = productRepository.findById(9L);
        if (optionalProduct.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Error.objectNotFoundID("Product"));
        Product product = optionalProduct.get();
        return ResponseEntity.status(HttpStatus.OK).body(new ProductDTO(product, productPictureRepository.findAllByProductId(9L)));
    }

    public ResponseEntity<?> getProduct(Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Error.objectNotFoundID("Product"));
        List<ProductPicture> productPictureList = productPictureRepository.findAllByProductId(id);
        List<Bid> bidList = bidRepository.findAllByProductId(id);
        if (bidList.isEmpty())
            return ResponseEntity.status(HttpStatus.OK).body(new ProductDTO(optionalProduct.get(), productPictureList, BigDecimal.valueOf(0), 0));
        else
            return ResponseEntity.status(HttpStatus.OK).body(new ProductDTO(optionalProduct.get(), productPictureList, bidList.stream().max(Comparator.comparing(Bid::getAmount)).get().getAmount(), bidList.size()));
    }

    public ResponseEntity<Page<ProductProjection>> getProductsForCategory(int page, int size, Long categoryId) {
        Page<ProductProjection> productProjectionPage = productRepository.getProductsForCategory(categoryId, PageRequest.of(page,size));
        return ResponseEntity.status(HttpStatus.OK).body(productProjectionPage);
    }

    public ResponseEntity<Page<ProductProjection>> getProductsForSubCategory(int page, int size, Long subCategoryId) {
        Page<ProductProjection> productProjectionPage = productRepository.getProductsForSubCategory(subCategoryId, PageRequest.of(page,size));
        return ResponseEntity.status(HttpStatus.OK).body(productProjectionPage);
    }

    public ResponseEntity searchProducts(String query) {
        List<ProductProjection> productProjectionList = productRepository.searchProducts(query);
        if (productProjectionList.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Error.errorMessage("No products found for given name or description."));
        return ResponseEntity.status(HttpStatus.OK).body(productProjectionList);
    }
}