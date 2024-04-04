package ba.atlant.auctionapp.controller;

import ba.atlant.auctionapp.model.Product;
import ba.atlant.auctionapp.projection.ProductProjection;
import ba.atlant.auctionapp.service.ProductService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
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

    @PostMapping()
    public ResponseEntity<?> addProduct(@Valid @RequestBody Product product) {
        return productService.addProduct(product);
    }

    @GetMapping("/all/new-arrivals")
    public ResponseEntity<Page<ProductProjection>> getNewArrivals(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "8") int size) {
        return productService.getNewArrivals(page, size);
    }

    @GetMapping("/all/last-chance")
    public ResponseEntity<Page<ProductProjection>> getLastChance(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "8") int size) {
        return productService.getLastChance(page, size);
    }

    @GetMapping("/highlight")
    public ResponseEntity<?> getHighlighted() {
        return productService.getHighlighted();
    }

    @GetMapping()
    public ResponseEntity<?> getProduct(@RequestParam Long id) {
        return productService.getProduct(id);
    }

    @GetMapping("/all/category")
    public ResponseEntity<Page<ProductProjection>> getProductsForCategory(@RequestParam(defaultValue = "0") int page,
                                                                          @RequestParam(defaultValue = "9") int size,
                                                                          @RequestParam(defaultValue = "1") Long categoryId) {
        return productService.getProductsForCategory(page, size, categoryId);
    }

    @GetMapping("/all/sub-category")
    public ResponseEntity<Page<ProductProjection>> getProductsForSubCategory(@RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "9") int size,
                                                 @RequestParam(defaultValue = "1") Long subCategoryId) {
        return productService.getProductsForSubCategory(page, size, subCategoryId);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchProducts(@RequestParam("query") String query){
        return productService.searchProducts(query);
    }
}