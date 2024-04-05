package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.dto.CategoryDTO;
import ba.atlant.auctionapp.error.Error;
import ba.atlant.auctionapp.model.Category;
import ba.atlant.auctionapp.projection.SubCategoryProjection;
import ba.atlant.auctionapp.repository.CategoryRepository;
import ba.atlant.auctionapp.repository.ProductRepository;
import ba.atlant.auctionapp.repository.SubCategoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;

    public CategoryService(CategoryRepository categoryRepository, SubCategoryRepository subCategoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.subCategoryRepository = subCategoryRepository;
    }

    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categoryList = categoryRepository.findAll();
        return ResponseEntity.ok(categoryList);
    }

    public ResponseEntity<List<CategoryDTO>> getCategoriesWithSubCategories() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryDTO> categoryDTOList = new ArrayList<>();

        categories.forEach(category -> {
            List<SubCategoryProjection> subCategoryProjectionList = subCategoryRepository.getSubCategoriesForSearch(category.getId());
            categoryDTOList.add(new CategoryDTO(category, subCategoryProjectionList));
        });

        return ResponseEntity.ok(categoryDTOList);
    }

    public ResponseEntity<List<Category>> searchCategories(String query) {
        List<Category> categoryList = categoryRepository.searchCategories(query);
        if (categoryList.isEmpty())
            throw new IllegalArgumentException("No categories found for given name.");
        return ResponseEntity.ok(categoryList);
    }
}