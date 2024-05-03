package ba.atlant.auctionapp.model;

import jakarta.persistence.*;

/**
 * Represents a wish list entry in the auction system, linking users to products they are interested in.
 * This entity facilitates tracking of products that a person wishes to monitor or purchase later.
 */

@Entity
public class WishList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Person person;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public WishList() {
    }

    public WishList(Person person, Product product) {
        this.person = person;
        this.product = product;
    }

    public Long getId() {
        return id;
    }

    public Person getUser() {
        return person;
    }

    public void setUser(Person person) {
        this.person = person;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}