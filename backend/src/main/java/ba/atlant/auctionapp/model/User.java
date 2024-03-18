package ba.atlant.auctionapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "First name cannot be blank.")
    @NotNull(message = "First name cannot be null.")
    @Column(name = "first_name")
    private String firstName;


    @NotBlank(message = "Last name cannot be blank.")
    @NotNull(message = "Last name cannot be null.")
    @Column(name = "last_name")
    private String lastName;

    @NotBlank(message = "Email cannot be blank.")
    @NotNull(message = "Email cannot be null.")
    @Email
    private String email;

    @NotBlank(message = "Username cannot be blank.")
    @NotNull(message = "Username cannot be null.")
    private String username;

    @NotBlank(message = "Birth date cannot be blank.")
    @NotNull(message = "Birth date cannot be null.")
    @Column(name = "birth_date")
    private LocalDate birthDate;

    private String phoneNumber;

    private String shippingStreet;

    private String shippingCity;

    private String zipcode;

    private String state;

    private String country;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToMany(mappedBy = "user")
    private List<CreditCard> creditCards;

    @OneToMany(mappedBy = "user")
    private List<WishList> wishes;

    @OneToMany(mappedBy = "user")
    private List<Product> products;

    @OneToMany(mappedBy = "user")
    private List<Bid> bids;
}
