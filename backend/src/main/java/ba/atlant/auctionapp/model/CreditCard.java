package ba.atlant.auctionapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

/**
 * Represents a credit card information associated with a person in the auction system.
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
    @Pattern(regexp = "^[0-9]*$", message = "Card number must contain only digits.")
    @Size(min = 13, max = 19, message = "Card number must contain between 13 and 19 digits.")
    @Column(name = "card_number")
    private String cardNumber;

    @NotNull(message = "Expiration month cannot be null.")
    @Column(name = "expiration_month")
    @Positive(message = "Expiration month must be a positive integer.")
    private Integer expirationMonth;

    @NotNull(message = "Expiration year cannot be null.")
    @Positive(message = "Expiration year must be a positive integer.")
    @Column(name = "expiration_year")
    private Integer expirationYear;

    @NotNull(message = "CVV number cannot be null.")
    @Min(value = 100, message = "CVV must be a three- or a four-digit number.")
    @Max(value = 9999, message = "CVV must be a three- or a four-digit number.")
    private Integer CVV;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Person person;

    public CreditCard() {
    }

    public CreditCard(String cardName, String cardNumber, Integer expirationMonth, Integer expirationYear, Integer CVV, Person person) {
        this.cardName = cardName;
        this.cardNumber = cardNumber;
        this.expirationMonth = expirationMonth;
        this.expirationYear = expirationYear;
        this.CVV = CVV;
        this.person = person;
    }

    public Long getId() {
        return id;
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

    public Integer getExpirationYear() {
        return expirationYear;
    }

    public void setExpirationYear(Integer expirationYear) {
        this.expirationYear = expirationYear;
    }

    public Integer getCVV() {
        return CVV;
    }

    public void setCVV(Integer CVV) {
        this.CVV = CVV;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
}