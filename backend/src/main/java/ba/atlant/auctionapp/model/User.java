package ba.atlant.auctionapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

/**
 * Represents a user of the auction system. This entity stores personal and contact information,
 * as well as relationships with roles, bids, credit cards, wish lists, and products.
 */

@Entity
@Table(name = "Profile")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "First name cannot be blank.")
    @NotNull(message = "First name cannot be null.")
    @Size(min = 2, max = 30, message = "First name must be between 2 and 30 characters long.")
    @Column(name = "first_name")
    private String firstName;

    @NotBlank(message = "Last name cannot be blank.")
    @NotNull(message = "Last name cannot be null.")
    @Size(min = 2, max = 30, message = "Last name must be between 2 and 30 characters long.")
    @Column(name = "last_name")
    private String lastName;

    @NotBlank(message = "Email cannot be blank.")
    @NotNull(message = "Email cannot be null.")
    @Email
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Password cannot be blank.")
    @NotNull(message = "Password cannot be null.")
    @Column(nullable = false)
    private String password;

    @NotBlank(message = "Username cannot be blank.")
    @NotNull(message = "Username cannot be null.")
    @Column(nullable = false, unique = true)
    private String username;

    @NotBlank(message = "Birth date cannot be blank.")
    @NotNull(message = "Birth date cannot be null.")
    @Column(name = "birth_date")
    private LocalDate birthDate;

    private String phoneNumber;

    private String shippingAddress;

    private String shippingCity;

    private String zipCode;

    private String state;

    private String country;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    public User() {
    }

    public User(String firstName,
                String lastName,
                String email,
                String username,
                LocalDate birthDate,
                String phoneNumber,
                String shippingAddress,
                String shippingCity,
                String zipCode,
                String state,
                String country,
                Role role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.birthDate = birthDate;
        this.phoneNumber = phoneNumber;
        this.shippingAddress = shippingAddress;
        this.shippingCity = shippingCity;
        this.zipCode = zipCode;
        this.state = state;
        this.country = country;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getShippingCity() {
        return shippingCity;
    }

    public void setShippingCity(String shippingCity) {
        this.shippingCity = shippingCity;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}