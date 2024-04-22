package ba.atlant.auctionapp.controller;

import ba.atlant.auctionapp.model.Person;
import ba.atlant.auctionapp.request.LoginRequest;
import ba.atlant.auctionapp.request.RegisterRequest;
import ba.atlant.auctionapp.response.AuthResponse;
import ba.atlant.auctionapp.service.PersonService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@Tag(name = "Person Controller")
public class PersonController {

    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @PostMapping
    @Operation(summary = "Adding user", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<String> addUser(@Valid @RequestBody Person person) {
        return personService.addUser(person);
    }

    @GetMapping
    @Operation(summary = "List of all users currently registered", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<Person>> getAllUsers() {
        return personService.getAllUsers();
    }

    @PostMapping("/login")
    @Operation(summary = "Log in for users")
    public ResponseEntity<AuthResponse> logIn(@Valid @RequestBody LoginRequest loginRequest) throws Exception {
        AuthResponse authResponse = personService.login(loginRequest);
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/register")
    @Operation(summary = "Registration of users")
    public ResponseEntity<AuthResponse> createAccount(@Valid @RequestBody RegisterRequest signUpRequest) throws Exception {
        AuthResponse authResponse = personService.register(signUpRequest);
        return ResponseEntity.ok(authResponse);
    }
}
