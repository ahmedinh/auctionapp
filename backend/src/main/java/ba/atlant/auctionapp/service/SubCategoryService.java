package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.model.Category;
import ba.atlant.auctionapp.model.SubCategory;
import ba.atlant.auctionapp.repository.CategoryRepository;
import ba.atlant.auctionapp.repository.SubCategoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubCategoryService {
    private final SubCategoryRepository subCategoryRepository;
    private final CategoryRepository categoryRepository;

    public SubCategoryService(SubCategoryRepository subCategoryRepository, CategoryRepository categoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
        this.categoryRepository = categoryRepository;
    }

    public ResponseEntity<List<SubCategory>> getAllForCategory(Long categoryId) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        if (optionalCategory.isEmpty())
            throw new IllegalArgumentException("Category not found for given ID.");
        List<SubCategory> subCategoryList = subCategoryRepository.findSubCategoriesByCategory(optionalCategory.get());
        return ResponseEntity.ok(subCategoryList);
    }
}
