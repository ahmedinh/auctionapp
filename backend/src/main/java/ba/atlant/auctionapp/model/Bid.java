package ba.atlant.auctionapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Represents a bid in an auction system.
 * Each bid is associated with a person and a product,
 * indicating the amount offered by the person for the product.
 */

@Entity
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @PositiveOrZero(message = "Bid amount must be greater or equal to 0.")
    @NotNull(message = "Bid amount cannot be null.")
    private BigDecimal amount;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Person person;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "bid_timestamp", nullable = false)
    private LocalDateTime bidTimeStamp;

    public Bid() {
    }

    public Long getId() {
        return id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public LocalDateTime getBidTimeStamp() {
        return bidTimeStamp;
    }

    public void setBidTimeStamp(LocalDateTime bidTimeStamp) {
        this.bidTimeStamp = bidTimeStamp;
    }
}