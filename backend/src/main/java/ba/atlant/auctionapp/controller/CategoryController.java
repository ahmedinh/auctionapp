package ba.atlant.auctionapp.controller;

import ba.atlant.auctionapp.service.CategoryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/category")
@Tag(name = "Category Controller")
@CrossOrigin("*")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/subcategories")
    public ResponseEntity getCategoriesWithSubCategories() {
        return categoryService.getCategoriesWithSubCategories();
    }
}
