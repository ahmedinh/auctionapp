package ba.atlant.auctionapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;

@Entity
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(value = 0, message = "Amount cannot be negative.")
    private Double amount;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

}
