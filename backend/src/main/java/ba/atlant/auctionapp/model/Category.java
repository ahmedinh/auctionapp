package ba.atlant.auctionapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @Size(min = 2, max = 30, message = "Category name must be between 2 and 30 characters long")
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "category")
    private List<Product> productList;

    public Category() {
    }

    public Category(String name, List<Product> productList) {
        this.name = name;
        this.productList = productList;
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

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}