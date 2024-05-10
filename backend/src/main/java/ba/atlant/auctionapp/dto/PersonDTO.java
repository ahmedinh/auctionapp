package ba.atlant.auctionapp.dto;

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

    @Min(value = 1, message = "Birth day must be at least 1")
    @Max(value = 31, message = "Birth day must be no more than 31")
    private Integer birthDay;

    @Min(value = 1, message = "Birth month must be at least 1")
    @Max(value = 12, message = "Birth month must be no more than 12")
    private Integer birthMonth;

    @Positive(message = "Birth year must be a positive number")
    private Integer birthYear;

    private String phoneNumber;

    private String shippingStreet;

    private String shippingCity;

    private String shippingZipCode;

    private String shippingState;

    private String shippingCountry;

    private CreditCardDTO creditCardDTO;
}