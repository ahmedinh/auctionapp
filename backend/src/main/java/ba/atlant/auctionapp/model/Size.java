package ba.atlant.auctionapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Size {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Size type cannot be null.")
    @NotBlank(message = "Size type cannot be blank.")
    @Column(name = "size_type", nullable = false)
    private String sizeType;

    @NotNull(message = "Size value cannot be null.")
    @NotBlank(message = "Size value cannot be blank.")
    @Column(name = "size_value", nullable = false)
    private String sizeValue;

    @OneToMany(mappedBy = "size")
    private List<Product> productList;
}