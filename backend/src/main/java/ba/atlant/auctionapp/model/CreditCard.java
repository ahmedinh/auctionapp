package ba.atlant.auctionapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
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
    @Pattern(regexp = "^[0-9]{16}$", message = "Card number must be exactly 16 digits.")
    @Column(name = "card_number")
    private String cardNumber;

    @NotBlank(message = "Expiration month cannot be blank.")
    @NotNull(message = "Expiration month cannot be null.")
    @Column(name = "expiration_month")
    @Positive(message = "Expiration month must be a positive integer.")
    private Integer expirationMonth;

    @NotBlank(message = "Expiration year cannot be blank.")
    @NotNull(message = "Expiration year cannot be null.")
    @Positive(message = "Expiration year must be a positive integer.")
    @Column(name = "expiration_year")
    private Integer expiration_year;

    @NotNull(message = "CVV number cannot be null.")
    @NotBlank(message = "CVV number cannot be blank.")
    @Pattern(regexp = "^[0-9]{3,4}$", message = "CVV must be exactly 3 digits.")
    private String CVV;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
