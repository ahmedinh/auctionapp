package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.error.Error;
import ba.atlant.auctionapp.model.Role;
import ba.atlant.auctionapp.model.User;
import ba.atlant.auctionapp.repository.RoleRepository;
import ba.atlant.auctionapp.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public ResponseEntity<String> addUser(User user) {
        Optional<Role> optionalRole = roleRepository.findByName(user.getRole().getName());
        if (optionalRole.isEmpty())
            throw new IllegalArgumentException("Role not found for given ID.");
        Role role = optionalRole.get();
        role.addUser(user);
        user.setRole(role);
        userRepository.save(user);
        roleRepository.save(role);
        return ResponseEntity.ok("User successfully added.");
    }

    public ResponseEntity<List<User>> getAllUsers() {
        List<User> userList = userRepository.findAll();
        return ResponseEntity.ok(userList);
    }
}
