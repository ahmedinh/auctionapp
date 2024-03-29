package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.model.Category;
import ba.atlant.auctionapp.repository.CategoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public ResponseEntity getAllCategories() {
        List<Category> categoryList = categoryRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(categoryList);
    }
}
