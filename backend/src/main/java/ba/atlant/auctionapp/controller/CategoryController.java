package ba.atlant.auctionapp.controller;

import ba.atlant.auctionapp.dto.CategoryDTO;
import ba.atlant.auctionapp.model.Category;
import ba.atlant.auctionapp.service.CategoryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<List<Category>> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/subcategories")
    public ResponseEntity<List<CategoryDTO>> getCategoriesWithSubCategories() {
        return categoryService.getCategoriesWithSubCategories();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Category>> searchCategories(@RequestParam("query") String query) {
        return categoryService.searchCategories(query);
    }
}
