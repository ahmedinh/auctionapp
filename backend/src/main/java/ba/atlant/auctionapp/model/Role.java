package ba.atlant.auctionapp.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

/**
 * Represents a role within the auction system, which can be assigned to users.
 * Roles are used to define different levels of access and permissions for users within the system.
 */

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = "name"))
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "role")
    private List<User> userList;
}