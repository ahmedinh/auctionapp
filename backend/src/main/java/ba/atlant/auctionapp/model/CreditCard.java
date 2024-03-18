package ba.atlant.auctionapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

@Entity
public class CreditCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Card name cannot be blank.")
    @NotNull(message = "Card name cannot be null.")
    @Column(name = "card_name")
    private String cardName;

    @NotBlank(message = "Card number cannot be blank.")
    @NotNull(message = "Card number cannot be null.")
    @Column(name = "card_number")
    private String cardNumber;

    @NotBlank(message = "Expiration date cannot be blank.")
    @NotNull(message = "Expiration date cannot be null.")
    @Column(name = "expiration_date")
    private LocalDate expirationDate;

    private Integer CVV;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
