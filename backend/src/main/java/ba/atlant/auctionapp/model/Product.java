package ba.atlant.auctionapp.model;

import ba.atlant.auctionapp.enumeration.Color;
import ba.atlant.auctionapp.enumeration.Size;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Represents a product that can be auctioned in the system.
 * Each product has associated details like name, description, starting price,
 * auction start and end times, and is linked to categories, bids, and users.
 */

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name cannot be blank.")
    @NotNull(message = "Name cannot be null.")
    private String name;

    private String description;

    @Min(value = 0, message = "Start price must be greater than {value}.")
    @Column(name = "start_price")
    private BigDecimal startPrice;

    @NotBlank(message = "Auction start date cannot be blank.")
    @NotNull(message = "Auction start date cannot be null.")
    private LocalDateTime auctionStart;

    @NotBlank(message = "Auction end date cannot be blank.")
    @NotNull(message = "Auction end date cannot be null.")
    private LocalDateTime auctionEnd;

    @Enumerated(EnumType.STRING)
    private Size size;

    @Enumerated(EnumType.STRING)
    private Color color;

    @OneToMany(mappedBy = "product")
    private List<WishList> wishList;

    @OneToMany(mappedBy = "product")
    private List<Bid> bidList;

    @OneToMany(mappedBy = "product")
    private List<ProductPicture> productPictureList;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Product() {
    }

    public Product(Long id,
                   String name,
                   String description,
                   BigDecimal startPrice,
                   LocalDateTime auctionStart,
                   LocalDateTime auctionEnd,
                   Size size,
                   List<WishList> wishList,
                   List<Bid> bidList,
                   List<ProductPicture> productPictureList,
                   Category category,
                   User user) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startPrice = startPrice;
        this.auctionStart = auctionStart;
        this.auctionEnd = auctionEnd;
        this.size = size;
        this.wishList = wishList;
        this.bidList = bidList;
        this.productPictureList = productPictureList;
        this.category = category;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getStartPrice() {
        return startPrice;
    }

    public void setStartPrice(BigDecimal startPrice) {
        this.startPrice = startPrice;
    }

    public LocalDateTime getAuctionStart() {
        return auctionStart;
    }

    public void setAuctionStart(LocalDateTime auctionStart) {
        this.auctionStart = auctionStart;
    }

    public LocalDateTime getAuctionEnd() {
        return auctionEnd;
    }

    public void setAuctionEnd(LocalDateTime auctionEnd) {
        this.auctionEnd = auctionEnd;
    }

    public Size getSize() {
        return size;
    }

    public void setSize(Size size) {
        this.size = size;
    }

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public List<WishList> getWishList() {
        return wishList;
    }

    public void setWishList(List<WishList> wishList) {
        this.wishList = wishList;
    }

    public List<Bid> getBidList() {
        return bidList;
    }

    public void setBidList(List<Bid> bidList) {
        this.bidList = bidList;
    }

    public List<ProductPicture> getProductPictureList() {
        return productPictureList;
    }

    public void setProductPictureList(List<ProductPicture> productPictureList) {
        this.productPictureList = productPictureList;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}