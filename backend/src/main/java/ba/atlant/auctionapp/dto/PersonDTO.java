package ba.atlant.auctionapp.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonDTO {
    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @Nullable
    @Min(value = 1, message = "Birth day must be at least 1")
    @Max(value = 31, message = "Birth day must be no more than 31")
    private Integer birthDay;

    @Nullable
    @Min(value = 1, message = "Birth month must be at least 1")
    @Max(value = 12, message = "Birth month must be no more than 12")
    private Integer birthMonth;

    @Nullable
    @Positive(message = "Birth year must be a positive number")
    private Integer birthYear;

    private String phoneNumber;

    private String shippingStreet;

    private String shippingCity;

    private String shippingZipCode;

    private String shippingState;

    private String shippingCountry;

    @Nullable
    private String cardName;

    @Nullable
    @Pattern(regexp = "^[0-9]*$", message = "Card number must contain only digits.")
    @Size(min = 13, max = 19, message = "Card number must contain between 13 and 19 digits.")
    private String cardNumber;

    @Nullable
    @Min(value = 1, message = "Expiration month must be at least 1")
    @Max(value = 12, message = "Expiration month must be no more than 12")
    private Integer expirationMonth;

    @Nullable
    @Positive(message = "Expiration year must be at least 1")
    private Integer expirationYear;

    @Nullable
    @Min(value = 100, message = "CVV must be at least 100")
    @Max(value = 9999, message = "CVV must be no more than 9999")
    private Integer cvc;
}