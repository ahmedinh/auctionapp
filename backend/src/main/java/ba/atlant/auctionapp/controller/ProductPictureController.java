package ba.atlant.auctionapp.controller;

import ba.atlant.auctionapp.dto.ProductPictureDTO;
import ba.atlant.auctionapp.model.Product;
import ba.atlant.auctionapp.model.ProductPicture;
import ba.atlant.auctionapp.service.ProductPictureService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/product-picture")
@Tag(name = "Product Picture Controller")
public class ProductPictureController {

    private final ProductPictureService productPictureService;

    public ProductPictureController(ProductPictureService productPictureService) {
        this.productPictureService = productPictureService;
    }

    @GetMapping
    public ResponseEntity getPicturesForProduct(@Valid @RequestBody Product product) {
        return productPictureService.getPicturesForProduct(product);
    }

    @PostMapping
    public ResponseEntity addPictureForProduct(@Valid @RequestBody ProductPictureDTO productPictureDTO) {
        return productPictureService.addPictureForProduct(productPictureDTO);
    }
}
