package ba.atlant.auctionapp.enumeration;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;

/**
 * Represents a role within the auction system, which can be assigned to users.
 * Roles are used to define different levels of access and permissions for users within the system.
 */

@RequiredArgsConstructor
public enum Role {
    ROLE_USER,
    ROLE_ADMIN;

    public List<SimpleGrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(this.name()));
    }
}