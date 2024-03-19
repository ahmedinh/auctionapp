package ba.atlant.auctionapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.List;

/**
 * Entity representing a category for products in the auction system.
 * Each category is defined by a unique name and can be associated with multiple products.
 */

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = "name"))
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

    public Category() {
    }

    public Category(Long id, String name, List<Product> products) {
        this.id = id;
        this.name = name;
        this.products = products;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}