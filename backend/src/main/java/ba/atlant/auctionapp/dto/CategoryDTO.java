package ba.atlant.auctionapp.dto;

import ba.atlant.auctionapp.model.Category;
import ba.atlant.auctionapp.model.SubCategory;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CategoryDTO {
    private Long id;
    private String name;
    private List<SubCategoryDTO> subCategoryDTOList;

    public CategoryDTO(Category category, List<SubCategoryDTO> subCategoryDTOList) {
        this.id = category.getId();;
        this.name = category.getName();
        this.subCategoryDTOList = subCategoryDTOList;
    }
}
