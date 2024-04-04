package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.model.Role;
import ba.atlant.auctionapp.model.User;
import ba.atlant.auctionapp.repository.RoleRepository;
import ba.atlant.auctionapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public ResponseEntity addUser(User user) {
        Optional<Role> optionalRole = roleRepository.findByName(user.getRole().getName());
        Role role = optionalRole.get();
        role.addUser(user);
        user.setRole(role);
        userRepository.save(user);
        roleRepository.save(role);
        return ResponseEntity.ok("User successfully added.");
    }

    public ResponseEntity getAllUsers() {
        List<User> userList = userRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(userList);
    }
}
