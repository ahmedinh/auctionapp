package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.dto.ProductDTO;
import ba.atlant.auctionapp.dto.ProductPictureDTO;
import ba.atlant.auctionapp.error.Error;
import ba.atlant.auctionapp.model.Category;
import ba.atlant.auctionapp.model.Product;
import ba.atlant.auctionapp.model.ProductPicture;
import ba.atlant.auctionapp.model.User;
import ba.atlant.auctionapp.repository.CategoryRepository;
import ba.atlant.auctionapp.repository.ProductPictureRepository;
import ba.atlant.auctionapp.repository.ProductRepository;
import ba.atlant.auctionapp.repository.UserRepository;
import ba.atlant.auctionapp.service.exception.ServiceException;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductPictureRepository productPictureRepository;
    private final UserRepository userRepository;


    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository, ProductPictureRepository productPictureRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.productPictureRepository = productPictureRepository;
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

    public ResponseEntity getNewArrivals(int page, int size) {
        Page<Product> productPage = productRepository.findAll(
                PageRequest.of(page, size, Sort.by("createdAt").descending()));
        return getProductDTOs(productPage);
    }

    public ResponseEntity getLastChance(int page, int size) {
        Page<Product> productPage = productRepository.findAll(
                PageRequest.of(page, size, Sort.by("auctionEnd").ascending()));
        return getProductDTOs(productPage);
    }

    private ResponseEntity getProductDTOs(Page<Product> productPage) {
        List<ProductDTO> productDTOList = productPage.getContent().stream()
                .map(product -> {
                    ProductDTO productDTO = new ProductDTO(product);
                    List<ProductPicture> productPictureList = productPictureRepository.getProductPicturesByProduct(product);
                    productDTO.setProductPictureList(productPictureList);
                    return productDTO;
                })
                .collect(Collectors.toList());
        Page<ProductDTO> productDTOPage = new PageImpl<>(productDTOList, productPage.getPageable(), productPage.getTotalElements());
        return ResponseEntity.status(HttpStatus.OK).body(productDTOPage);
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
        if (product.getMaxBid().isEmpty()) {
            productDTO.setLargestBid(BigDecimal.valueOf(0));
            productDTO.setNumberOfBids(0);
        } else {
            productDTO.setLargestBid(product.getMaxBid().get().getAmount());
            productDTO.setNumberOfBids(product.getBidList().size());
        }
        return ResponseEntity.status(HttpStatus.OK).body(productDTO);
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