package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.error.Error;
import ba.atlant.auctionapp.repository.CategoryRepository;
import ba.atlant.auctionapp.repository.SubCategoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class SubCategoryService {
    private final SubCategoryRepository subCategoryRepository;
    private final CategoryRepository categoryRepository;

    public SubCategoryService(SubCategoryRepository subCategoryRepository, CategoryRepository categoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
        this.categoryRepository = categoryRepository;
    }

    public ResponseEntity getAllForCategory(Long categoryId) {
        var optionalCategory = categoryRepository.findById(categoryId);
        if (optionalCategory.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Error.objectNotFoundID("Category"));
        var subCategoryList = subCategoryRepository.findSubCategoriesByCategory(optionalCategory.get());
        return ResponseEntity.status(HttpStatus.OK).body(subCategoryList);
    }
}
