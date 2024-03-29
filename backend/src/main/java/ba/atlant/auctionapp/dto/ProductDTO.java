package ba.atlant.auctionapp.dto;

import ba.atlant.auctionapp.enumeration.Color;
import ba.atlant.auctionapp.enumeration.Size;
import ba.atlant.auctionapp.model.Category;
import ba.atlant.auctionapp.model.Product;
import ba.atlant.auctionapp.model.ProductPicture;
import ba.atlant.auctionapp.model.User;
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
    private Size size;
    private Color color;
    private List<ProductPicture> productPictureList;
    private Category category;
    private User user;
    private BigDecimal largestBid;
    private Integer numberOfBids;

    public ProductDTO(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.startPrice = product.getStartPrice();
        this.createdAt = product.getCreatedAt();
        this.auctionStart = product.getAuctionStart();
        this.auctionEnd = product.getAuctionEnd();
        this.size = product.getSize();
        this.color = product.getColor();
        this.productPictureList = product.getProductPictureList();
        this.category = product.getCategory();
        this.user = product.getUser();
    }
}