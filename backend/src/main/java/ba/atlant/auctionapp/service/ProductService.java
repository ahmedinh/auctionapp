package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.dto.ProductDTO;
import ba.atlant.auctionapp.dto.ProductPictureDTO;
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
    private final CategoryRepository categoryRepository;
    private final ProductPictureRepository productPictureRepository;
    private final UserRepository userRepository;
    private final BidRepository bidRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository, ProductPictureRepository productPictureRepository, UserRepository userRepository, BidRepository bidRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.productPictureRepository = productPictureRepository;
        this.userRepository = userRepository;
        this.bidRepository = bidRepository;
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

    public ResponseEntity getNewArrivals(int page, int size) {
        Page<ProductProjection> productProjectionPage = productRepository.getNewArrivalsProducts(PageRequest.of(page,size));
        return ResponseEntity.status(HttpStatus.OK).body(productProjectionPage);
    }

    public ResponseEntity getLastChance(int page, int size) {
        Page<ProductProjection> productProjectionPage = productRepository.getLastChanceProducts(PageRequest.of(page,size));
        return ResponseEntity.status(HttpStatus.OK).body(productProjectionPage);
    }

    public ResponseEntity getHighlighted() {
        Optional<Product> optionalProduct = productRepository.findById(9L);
        if (optionalProduct.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Error.objectNotFoundID("Product"));
        Product product = optionalProduct.get();
        ProductDTO productDTO = new ProductDTO(product);
        productDTO.setProductPictureList(productPictureRepository.getProductPicturesByProduct(product));
        return ResponseEntity.status(HttpStatus.OK).body(productDTO);
    }

    public ResponseEntity getProduct(Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Error.objectNotFoundID("Product"));
        Product product = optionalProduct.get();
        ProductDTO productDTO = new ProductDTO(product);
        productDTO.setProductPictureList(productPictureRepository.getProductPicturesByProduct(product));
        List<Bid> bidList = bidRepository.findBidsByProduct(product);
        if (bidList.isEmpty()) {
            productDTO.setLargestBid(BigDecimal.valueOf(0));
            productDTO.setNumberOfBids(0);
        } else {
            productDTO.setLargestBid(bidList.stream().max(Comparator.comparing(Bid::getAmount)).get().getAmount());
            productDTO.setNumberOfBids(bidList.size());
        }
        return ResponseEntity.status(HttpStatus.OK).body(productDTO);
    }

    public ResponseEntity getProductsForCategory(int page, int size, Long categoryId) {
        Page<ProductProjection> productProjectionPage = productRepository.getProductsForCategory(categoryId, PageRequest.of(page,size));
        return ResponseEntity.status(HttpStatus.OK).body(productProjectionPage);
    }

    public ResponseEntity addPictureToPictureList(ProductPictureDTO productPictureDTO) {
        Optional<Product> optionalProduct = productRepository.findById(productPictureDTO.getProductId());
        if (optionalProduct.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Error.objectNotFoundID("Product"));
        Product product = optionalProduct.get();
        ProductPicture productPicture = new ProductPicture();
        productPicture.setName(productPictureDTO.getName());
        productPicture.setUrl(productPictureDTO.getUrl());
        productPicture.setProduct(product);
        productPictureRepository.save(productPicture);
        return ResponseEntity.status(HttpStatus.OK).body(productPicture);
    }
}