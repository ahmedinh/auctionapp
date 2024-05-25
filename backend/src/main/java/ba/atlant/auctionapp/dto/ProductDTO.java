package ba.atlant.auctionapp.dto;

import ba.atlant.auctionapp.model.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
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
    private LocalDate auctionStart;
    private LocalDate auctionEnd;
    private List<ProductPicture> productPictureList;
    private SubCategory subCategory;
    private Person person;
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
        this.subCategory = product.getSubCategory();
        this.person = product.getPerson();
        this.productPictureList = productPictureList;
    }
}