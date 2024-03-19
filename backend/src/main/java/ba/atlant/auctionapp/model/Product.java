package ba.atlant.auctionapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Represents a product that can be auctioned in the system.
 * Each product has associated details like name, description, starting price,
 * auction start and end times, and is linked to categories, bids, and users.
 */

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
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
    private BigDecimal startPrice;

    @NotBlank(message = "Auction start date cannot be blank.")
    @NotNull(message = "Auction start date cannot be null.")
    private LocalDateTime auctionStart;

    @NotBlank(message = "Auction end date cannot be blank.")
    @NotNull(message = "Auction end date cannot be null.")
    private LocalDateTime auctionEnd;

    @ManyToOne
    @JoinColumn(name = "size_id", nullable = false)
    private Size size;

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
}