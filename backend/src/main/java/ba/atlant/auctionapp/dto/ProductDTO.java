package ba.atlant.auctionapp.dto;

import ba.atlant.auctionapp.model.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal startPrice;
    private LocalDateTime createdAt;
    private LocalDateTime auctionStart;
    private LocalDateTime auctionEnd;
    private String size;
    private String color;
    private List<ProductPicture> productPictureList;
    private SubCategory subCategory;
    private User user;
    private BigDecimal largestBid;
    private Integer numberOfBids;

    public ProductDTO(Product product, List<ProductPicture> productPictureList, BigDecimal largestBid, Integer numberOfBids) {
        this(product,productPictureList);
        this.largestBid = largestBid;
        this.numberOfBids = numberOfBids;
    }

    public ProductDTO(Product product, List<ProductPicture> productPictureList) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.startPrice = product.getStartPrice();
        this.createdAt = product.getCreatedAt();
        this.auctionStart = product.getAuctionStart();
        this.auctionEnd = product.getAuctionEnd();
        this.size = product.getSize().toString();
        this.color = product.getColor().toString();
        this.subCategory = product.getSubCategory();
        this.user = product.getUser();
        this.productPictureList = productPictureList;
    }
}