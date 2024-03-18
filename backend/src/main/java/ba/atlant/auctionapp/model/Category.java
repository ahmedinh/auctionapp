package ba.atlant.auctionapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = "name"))
@Getter
@Setter
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Category name must not be null")
    @NotEmpty(message = "Category name must not be empty")
    @Size(min = 2, max = 30, message = "Category name must be between 2 and 255 characters long")
    @Pattern(regexp = "^[A-Z][a-zA-Z0-9 ',-]*$", message = "Category name must start with a capital letter and only contain alphanumeric characters, spaces, apostrophes, or hyphens")
    private String name;

    @OneToMany(mappedBy = "category")
    private List<Product> products;

}
