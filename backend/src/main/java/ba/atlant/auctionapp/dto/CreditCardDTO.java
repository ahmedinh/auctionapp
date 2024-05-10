package ba.atlant.auctionapp.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreditCardDTO {
    @NotBlank(message = "Card name cannot be blank")
    private String cardName;

    @Pattern(regexp = "^[0-9]*$", message = "Card number must contain only digits.")
    @Size(min = 13, max = 19, message = "Card number must contain between 13 and 19 digits.")
    private String cardNumber;

    @Min(value = 1, message = "Expiration month must be at least 1")
    @Max(value = 12, message = "Expiration month must be no more than 12")
    private Integer expirationMonth;

    @Positive(message = "Birth year must be at least 1")
    private Integer expirationYear;

    @Min(value = 100, message = "CVV must be at least 100")
    @Max(value = 9999, message = "CVV must be no more than 9999")
    private Integer cvc;

    public CreditCardDTO(String cardName, String cardNumber, Integer expirationMonth, Integer expirationYear, Integer cvc) {
        this.cardName = cardName;
        this.cardNumber = cardNumber;
        this.expirationMonth = expirationMonth;
        this.expirationYear = expirationYear;
        this.cvc = cvc;
    }
}