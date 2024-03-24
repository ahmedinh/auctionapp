package ba.atlant.auctionapp.controller;

import ba.atlant.auctionapp.model.Category;
import ba.atlant.auctionapp.service.CategoryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/category")
@Tag(name = "Category Controller")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity getAllCategories() {
        return categoryService.getAllCategories();
    }
}
