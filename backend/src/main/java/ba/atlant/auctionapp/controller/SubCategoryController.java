package ba.atlant.auctionapp.controller;

import ba.atlant.auctionapp.model.SubCategory;
import ba.atlant.auctionapp.service.SubCategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sub-category")
@Tag(name = "SubCategory Controller")
@CrossOrigin("*")
public class SubCategoryController {
    private final SubCategoryService subCategoryService;

    public SubCategoryController(SubCategoryService subCategoryService) {
        this.subCategoryService = subCategoryService;
    }

    @GetMapping("/all/category")
    @Operation(summary = "All subcategores in single category", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<SubCategory>> getAllForCategory(@RequestParam(defaultValue = "1") Long categoryId) {
        return subCategoryService.getAllForCategory(categoryId);
    }
}
