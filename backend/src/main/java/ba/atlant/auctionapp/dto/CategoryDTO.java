package ba.atlant.auctionapp.dto;

import ba.atlant.auctionapp.model.Category;
import ba.atlant.auctionapp.projection.SubCategoryProjection;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CategoryDTO {
    private Long id;
    private String name;
    private List<SubCategoryProjection> subCategoryProjectionList;

    public CategoryDTO(Category category, List<SubCategoryProjection> subCategoryProjectionList) {
        this.id = category.getId();;
        this.name = category.getName();
        this.subCategoryProjectionList = subCategoryProjectionList;
    }
}
