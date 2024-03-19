package ba.atlant.auctionapp.model;

import jakarta.persistence.*;

/**
 * Represents a picture associated with a product in the auction system.
 * Each product can have multiple pictures, and each picture is identified by a unique URL.
 */

@Entity
public class ProductPicture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String url;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public ProductPicture() {
    }

    public ProductPicture(Long id, String url, Product product) {
        this.id = id;
        this.url = url;
        this.product = product;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}