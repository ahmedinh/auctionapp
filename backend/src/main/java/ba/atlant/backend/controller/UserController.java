package ba.atlant.backend.controller;

import ba.atlant.backend.model.User;
import ba.atlant.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/save")
    public ResponseEntity getUser() {
        User user = new User();
        user.setName("Ahmedin");
        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }
}
