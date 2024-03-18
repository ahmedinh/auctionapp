package ba.atlant.auctionapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name cannot be blank.")
    @NotNull(message = "Name cannot be null.")
    private String name;

    private String description;

    @Min(value = 0, message = "Start price cannot be negative.")
    @Column(name = "start_price")
    private Double startPrice;

    @NotBlank(message = "Auction start date cannot be blank.")
    @NotNull(message = "Auction start date cannot be null.")
    private LocalDateTime auctionStart;

    @NotBlank(message = "Auction end date cannot be blank.")
    @NotNull(message = "Auction end date cannot be null.")
    private LocalDateTime auctionEnd;

    private Integer shoeSize;

    private String clothesSize;

    @OneToMany(mappedBy = "product")
    private List<WishList> wishes;

    @OneToMany(mappedBy = "product")
    private List<Bid> bids;

    @OneToMany(mappedBy = "product")
    private List<ProductPicture> productPictures;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
