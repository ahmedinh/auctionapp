package ba.atlant.auctionapp.controller;

import ba.atlant.auctionapp.model.Product;
import ba.atlant.auctionapp.service.ProductService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/product")
@Tag(name = "Product Controller")
@CrossOrigin("*")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }


    @GetMapping("/all/new-arrivals")
    public ResponseEntity getNewArrivals() {
        return productService.getNewArrivals();
    }

    @GetMapping("/all/last-chance")
    public ResponseEntity getLastChance() {
        return productService.getLastChance();
    }

    @GetMapping("/highlight")
    public ResponseEntity getHighlighted() {
        return productService.getHighlighted();
    }
}