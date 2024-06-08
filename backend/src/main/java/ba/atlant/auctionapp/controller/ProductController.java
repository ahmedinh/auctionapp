package ba.atlant.auctionapp.controller;

import ba.atlant.auctionapp.dto.ProductCreationDTO;
import ba.atlant.auctionapp.dto.ProductDTO;
import ba.atlant.auctionapp.model.Product;
import ba.atlant.auctionapp.model.ProductPicture;
import ba.atlant.auctionapp.projection.ProductProjection;
import ba.atlant.auctionapp.projection.ProductUserProjection;
import ba.atlant.auctionapp.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/product")
@Tag(name = "Product Controller")
@CrossOrigin("*")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping(value = "")
    @Operation(summary = "Adding product", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Product> addProduct(@Valid @RequestBody ProductCreationDTO productCreationDTO,
                                              @RequestHeader("Authorization") String authHeader) {
        return productService.addProduct(productCreationDTO, authHeader);
    }

    @GetMapping("/all/new-arrivals")
    @Operation(summary = "Products for new arrivals tab")
    public ResponseEntity<Page<ProductProjection>> getNewArrivals(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "8") int size) {
        return productService.getNewArrivals(page, size);
    }

    @GetMapping("/all/last-chance")
    @Operation(summary = "Products for last chance tab")
    public ResponseEntity<Page<ProductProjection>> getLastChance(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "8") int size) {
        return productService.getLastChance(page, size);
    }

    @GetMapping("/highlight")
    @Operation(summary = "Highlighted product")
    public ResponseEntity<ProductDTO> getHighlighted() {
        return productService.getHighlighted();
    }

    @GetMapping()
    @Operation(summary = "One product")
    public ResponseEntity<ProductDTO> getProduct(@RequestParam Long id) {
        return productService.getProduct(id);
    }

    @GetMapping("/all/category")
    @Operation(summary = "All products for category")
    public ResponseEntity<Page<ProductProjection>> getProductsForCategory(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size,
            @RequestParam(defaultValue = "1") Long categoryId,
            @RequestParam(defaultValue = "name") String sortField,
            @RequestParam(defaultValue = "asc") String sortDirection,
            @Nullable @RequestParam String subCategoryIds,
            @RequestParam(defaultValue = "0") BigDecimal minPrice,
            @RequestParam(defaultValue = "999999999") BigDecimal maxPrice) {

        List<Long> subCategoryIdList = null;
        if (subCategoryIds != null && !subCategoryIds.isEmpty()) {
            subCategoryIdList = Arrays.stream(subCategoryIds.split(","))
                    .map(Long::parseLong)
                    .collect(Collectors.toList());
        }
        return productService.getProductsForCategory(page, size, categoryId, sortField, sortDirection, subCategoryIdList, minPrice, maxPrice);
    }

    @GetMapping("/all/sub-category")
    @Operation(summary = "All products for subcategory")
    public ResponseEntity<Page<ProductProjection>> getProductsForSubCategory(@RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "9") int size,
                                                 @RequestParam(defaultValue = "1") Long subCategoryId) {
        return productService.getProductsForSubCategory(page, size, subCategoryId);
    }

    @GetMapping("/search-suggestion")
    @Operation(summary = "Suggestion of products search")
    public ResponseEntity<Map<String, String>> searchSuggestedProducts(@RequestParam("query") String query,
                                                                       @RequestParam(value = "threshold", defaultValue = "10") Integer threshold){
        return productService.getSuggestion(query, threshold);
    }

    @GetMapping("/search-products")
    @Operation(summary = "Products search")
    public ResponseEntity<Page<ProductProjection>> searchProducts(@RequestParam(defaultValue = "0") int page,
                                                                  @RequestParam(defaultValue = "9") int size,
                                                                  @RequestParam("query") String query,
                                                                  @RequestParam(defaultValue = "name") String sortField,
                                                                  @RequestParam(defaultValue = "asc") String sortDirection,
                                                                  @Nullable @RequestParam String subCategoryIds,
                                                                  @RequestParam(defaultValue = "0") BigDecimal minPrice,
                                                                  @RequestParam(defaultValue = "999999999") BigDecimal maxPrice){
        List<Long> subCategoryIdList = null;
        if (subCategoryIds != null && !subCategoryIds.isEmpty()) {
            subCategoryIdList = Arrays.stream(subCategoryIds.split(","))
                    .map(Long::parseLong)
                    .collect(Collectors.toList());
        }
        return productService.searchProducts(page, size, query, sortField, sortDirection, subCategoryIdList, minPrice, maxPrice);
    }

    @PostMapping(value = "/add-picture", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Operation(summary = "Add pictures to product", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<ProductPicture>> addProductPictures (@RequestBody MultipartFile[] files,
                                                                    @RequestParam("productName") String productName) throws IOException {
        return productService.addProductPictures(files, productName);
    }

    @GetMapping(value = "/user/active")
    @Operation(summary = "Products created by user currently active", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<ProductUserProjection>> activeUserProducts(@RequestParam("userId") Long userId) {
        return productService.activeUserProducts(userId);
    }

    @GetMapping(value = "/user/sold")
    @Operation(summary = "Products created by user sold on auctions", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<ProductUserProjection>> soldUserProducts(@RequestParam("userId") Long userId) {
        return productService.soldUserProducts(userId);
    }

    @DeleteMapping(value = "/delete")
    @Operation(summary = "Deletion of product created by user", security = @SecurityRequirement(name = "bearerAuth"))
    public void deleteProduct(@RequestParam("productName") String productName) {
        productService.deleteProduct(productName);
    }

    @GetMapping(value = "/recommended")
    @Operation(summary = "Fetch recommended products for users")
    public ResponseEntity<List<ProductProjection>> getRecommendedProducts(@Nullable @RequestParam(value = "userId") Long userId) {
        return productService.getRecommendedProducts(userId);
    }
}