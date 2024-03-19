package ba.atlant.auctionapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

/**
 * Represents a credit card information associated with a user in the auction system.
 * Stores details necessary for processing transactions.
 */

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

    public CreditCard() {
    }

    public CreditCard(Long id, String cardName, String cardNumber, Integer expirationMonth, Integer expiration_year, String CVV, User user) {
        this.id = id;
        this.cardName = cardName;
        this.cardNumber = cardNumber;
        this.expirationMonth = expirationMonth;
        this.expiration_year = expiration_year;
        this.CVV = CVV;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCardName() {
        return cardName;
    }

    public void setCardName(String cardName) {
        this.cardName = cardName;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public Integer getExpirationMonth() {
        return expirationMonth;
    }

    public void setExpirationMonth(Integer expirationMonth) {
        this.expirationMonth = expirationMonth;
    }

    public Integer getExpiration_year() {
        return expiration_year;
    }

    public void setExpiration_year(Integer expiration_year) {
        this.expiration_year = expiration_year;
    }

    public String getCVV() {
        return CVV;
    }

    public void setCVV(String CVV) {
        this.CVV = CVV;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
