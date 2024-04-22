package ba.atlant.auctionapp.controller;

import ba.atlant.auctionapp.dto.ProductDTO;
import ba.atlant.auctionapp.model.Product;
import ba.atlant.auctionapp.projection.ProductProjection;
import ba.atlant.auctionapp.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
    @Operation(summary = "Adding product", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Long> addProduct(@Valid @RequestBody Product product) {
        return productService.addProduct(product);
    }

    @GetMapping("/all/new-arrivals")
    @Operation(summary = "Products for new arrivals tab", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Page<ProductProjection>> getNewArrivals(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "8") int size) {
        return productService.getNewArrivals(page, size);
    }

    @GetMapping("/all/last-chance")
    @Operation(summary = "Products for last chance tab", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Page<ProductProjection>> getLastChance(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "8") int size) {
        return productService.getLastChance(page, size);
    }

    @GetMapping("/highlight")
    @Operation(summary = "Highlighted product", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ProductDTO> getHighlighted() {
        return productService.getHighlighted();
    }

    @GetMapping()
    @Operation(summary = "One product", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ProductDTO> getProduct(@RequestParam Long id) {
        return productService.getProduct(id);
    }

    @GetMapping("/all/category")
    @Operation(summary = "All products for category", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Page<ProductProjection>> getProductsForCategory(@RequestParam(defaultValue = "0") int page,
                                                                          @RequestParam(defaultValue = "9") int size,
                                                                          @RequestParam(defaultValue = "1") Long categoryId) {
        return productService.getProductsForCategory(page, size, categoryId);
    }

    @GetMapping("/all/sub-category")
    @Operation(summary = "All products for subcategory", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Page<ProductProjection>> getProductsForSubCategory(@RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "9") int size,
                                                 @RequestParam(defaultValue = "1") Long subCategoryId) {
        return productService.getProductsForSubCategory(page, size, subCategoryId);
    }

    @GetMapping("/search-suggestion")
    @Operation(summary = "Suggestion of products search", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Map<String, String>> searchSuggestedProducts(@RequestParam("query") String query,
                                                                       @RequestParam(value = "threshold", defaultValue = "10") Integer threshold){
        return productService.getSuggestion(query, threshold);
    }

    @GetMapping("/search-products")
    @Operation(summary = "Products search", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Page<ProductProjection>> searchProducts(@RequestParam(defaultValue = "0") int page,
                                                                  @RequestParam(defaultValue = "9") int size,
                                                                  @RequestParam("query") String query){
        return productService.searchProducts(page, size, query);
    }
}