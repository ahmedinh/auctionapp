package ba.atlant.auctionapp.model;

import ba.atlant.auctionapp.dto.ProductCreationDTO;
import ba.atlant.auctionapp.enumeration.Color;
import ba.atlant.auctionapp.enumeration.Size;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Represents a product that can be auctioned in the system.
 * Each product has associated details like name, description, starting price,
 * auction start and end times, and is linked to categories, bids, and users.
 */

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name cannot be blank.")
    @NotNull(message = "Name cannot be null.")
    private String name;

    private String description;

    @Min(value = 0, message = "Start price must be greater than {value}.")
    @Column(name = "start_price")
    private BigDecimal startPrice;

    @NotNull(message = "Time of creation cannot be null.")
    private LocalDateTime createdAt;

    @NotNull(message = "Auction start date cannot be null.")
    private LocalDate auctionStart;

    @NotNull(message = "Auction end date cannot be null.")
    private LocalDate auctionEnd;

    @Enumerated(EnumType.STRING)
    @JsonIgnore
    private Size size;

    @Enumerated(EnumType.STRING)
    @JsonIgnore
    private Color color;

    @ManyToOne
    @JoinColumn(name = "subcategory_id", nullable = false)
    private SubCategory subCategory;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Person person;

    public Product() {
    }

    public Product(ProductCreationDTO productCreationDTO, Person person, SubCategory subCategory) {
        setName(productCreationDTO.getName());
        setDescription(productCreationDTO.getDescription());
        setAuctionStart(productCreationDTO.getAuctionStart());
        setAuctionEnd(productCreationDTO.getAuctionEnd());
        setCreatedAt(LocalDateTime.now());
        setPerson(person);
        setSubCategory(subCategory);
        setStartPrice(productCreationDTO.getStartPrice());
    }

    public Product(String name,
                   String description,
                   BigDecimal startPrice,
                   LocalDateTime createdAt,
                   LocalDate auctionStart,
                   LocalDate auctionEnd,
                   Size size,
                   Color color,
                   SubCategory subCategory,
                   Person person) {
        this.name = name;
        this.description = description;
        this.startPrice = startPrice;
        this.createdAt = createdAt;
        this.auctionStart = auctionStart;
        this.auctionEnd = auctionEnd;
        this.size = size;
        this.color = color;
        this.subCategory = subCategory;
        this.person = person;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getStartPrice() {
        return startPrice;
    }

    public void setStartPrice(BigDecimal startPrice) {
        this.startPrice = startPrice;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getAuctionStart() {
        return auctionStart;
    }

    public void setAuctionStart(LocalDate auctionStart) {
        this.auctionStart = auctionStart;
    }

    public LocalDate getAuctionEnd() {
        return auctionEnd;
    }

    public void setAuctionEnd(LocalDate auctionEnd) {
        this.auctionEnd = auctionEnd;
    }

    public Size getSize() {
        return size;
    }

    public void setSize(Size size) {
        this.size = size;
    }

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public SubCategory getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(SubCategory subCategory) {
        this.subCategory = subCategory;
    }

    public Person getUser() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
}