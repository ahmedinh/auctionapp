package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.dto.ProductPictureDTO;
import ba.atlant.auctionapp.error.Error;
import ba.atlant.auctionapp.model.Product;
import ba.atlant.auctionapp.model.ProductPicture;
import ba.atlant.auctionapp.repository.ProductPictureRepository;
import ba.atlant.auctionapp.repository.ProductRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductPictureService {

    private final ProductPictureRepository productPictureRepository;
    private final ProductRepository productRepository;
    private final ObjectMapper objectMapper;

    public ProductPictureService(ProductPictureRepository productPictureRepository, ProductRepository productRepository, ObjectMapper objectMapper) {
        this.productPictureRepository = productPictureRepository;
        this.productRepository = productRepository;
        this.objectMapper = objectMapper;
    }

    public ResponseEntity getPicturesForProduct(Product product1) {
        Optional<Product> optionalProduct = productRepository.getProductByName(product1.getName());
        if (optionalProduct.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Error.objectNotFoundID("Product"));
        Product product = optionalProduct.get();
        List<ProductPicture> productPictureList = productPictureRepository.getProductPicturesByProduct(product);
        return ResponseEntity.status(HttpStatus.OK).body(productPictureList);
    }

    public ResponseEntity addPictureForProduct(ProductPictureDTO productPictureDTO) {
        Optional<Product> optionalProduct = productRepository.findById(productPictureDTO.getProductId());
        if (optionalProduct.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Error.objectNotFoundID("Product"));
        ProductPicture productPicture = new ProductPicture();
        productPicture.setProduct(optionalProduct.get());
        productPicture.setName(productPictureDTO.getName());
        productPicture.setUrl(productPictureDTO.getUrl());
        productPictureRepository.save(productPicture);
        return ResponseEntity.status(HttpStatus.OK).body(forReturn(productPicture));
    }

    private ObjectNode forReturn(ProductPicture productPicture) {
        ObjectNode objectNode = objectMapper.createObjectNode();
        objectNode.put("id",productPicture.getId());
        objectNode.put("name", productPicture.getName());
        objectNode.put("url", productPicture.getUrl());
        return objectNode;
    }
}
