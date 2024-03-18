package ba.atlant.auctionapp.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = "name"))
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "category")
    private List<Product> products;

}
