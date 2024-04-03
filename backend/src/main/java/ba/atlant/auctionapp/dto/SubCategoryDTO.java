package ba.atlant.auctionapp.dto;

import ba.atlant.auctionapp.model.Category;
import ba.atlant.auctionapp.model.SubCategory;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SubCategoryDTO {
    private Long id;
    private String name;
    private Integer numberOfProducts;

    public SubCategoryDTO(SubCategory subCategory, Integer numberOfProducts) {
        this.id = subCategory.getId();
        this.name = subCategory.getName();
        this.numberOfProducts = numberOfProducts;
    }
}
