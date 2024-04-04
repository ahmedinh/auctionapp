package ba.atlant.auctionapp.controller;

import ba.atlant.auctionapp.model.User;
import ba.atlant.auctionapp.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@Tag(name = "User Controller")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity addUser(@Valid @RequestBody User user) {
        return userService.addUser(user);
    }

    @GetMapping
    public ResponseEntity getAllUsers() {
        return userService.getAllUsers();
    }
}
