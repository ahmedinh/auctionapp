package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.dto.CategoryDTO;
import ba.atlant.auctionapp.dto.SubCategoryDTO;
import ba.atlant.auctionapp.model.Category;
import ba.atlant.auctionapp.repository.CategoryRepository;
import ba.atlant.auctionapp.repository.ProductRepository;
import ba.atlant.auctionapp.repository.SubCategoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;
    private final ProductRepository productRepository;

    public CategoryService(CategoryRepository categoryRepository, SubCategoryRepository subCategoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.productRepository = productRepository;
    }

    public ResponseEntity getAllCategories() {
        List<Category> categoryList = categoryRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(categoryList);
    }

    public ResponseEntity getCategoriesWithSubCategories() {
        List<Category> categoryList = categoryRepository.findAll();
        List<CategoryDTO> categoryDTOList = categoryList.stream().map(category -> new CategoryDTO(category, subCategoryRepository.findSubCategoriesByCategory(category).stream().map(subCategory -> new SubCategoryDTO(subCategory, productRepository.getNumberOfProducts(subCategory.getId()))).toList())).toList();
        return ResponseEntity.status(HttpStatus.OK).body(categoryDTOList);
    }
}
