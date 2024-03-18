package ba.atlant.auctionapp.model;

import jakarta.persistence.*;

@Entity
public class ProductPicture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

}
