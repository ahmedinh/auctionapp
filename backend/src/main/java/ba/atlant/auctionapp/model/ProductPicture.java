package ba.atlant.auctionapp.model;

import jakarta.persistence.*;
import lombok.*;

/**
 * Represents a picture associated with a product in the auction system.
 * Each product can have multiple pictures, and each picture is identified by a unique URL.
 */

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProductPicture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String url;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}