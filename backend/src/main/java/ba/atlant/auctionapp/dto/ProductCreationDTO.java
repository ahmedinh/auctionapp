package ba.atlant.auctionapp.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductCreationDTO {
    @NotBlank(message = "Name cannot be blank.")
    private String name;
    @NotBlank(message = "Description cannot be blank.")
    private String description;
    @Min(value = 0, message = "Start price must be greater than {value}.")
    private BigDecimal startPrice;
    @NotNull(message = "Auction start date cannot be null.")
    private LocalDate auctionStart;
    @NotNull(message = "Auction end date cannot be null.")
    private LocalDate auctionEnd;
    @NotBlank(message = "Subcategory cannot be null.")
    private String selectedSubcategory;
    @NotBlank(message = "Category cannot be null.")
    private String selectedCategory;
    private String returnAddress;
    private String returnEmail;
    private String returnCity;
    private String returnZipCode;
    private String returnCountry;
    private String returnPhoneNumber;
}