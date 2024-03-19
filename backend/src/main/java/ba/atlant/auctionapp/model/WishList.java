package ba.atlant.auctionapp.model;

import jakarta.persistence.*;
import lombok.*;

/**
 * Represents a wish list entry in the auction system, linking users to products they are interested in.
 * This entity facilitates tracking of products that a user wishes to monitor or purchase later.
 */

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class WishList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}