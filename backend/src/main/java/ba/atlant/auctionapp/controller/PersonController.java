package ba.atlant.auctionapp.controller;

import ba.atlant.auctionapp.dto.PersonDTO;
import ba.atlant.auctionapp.model.Person;
import ba.atlant.auctionapp.projection.PersonProjection;
import ba.atlant.auctionapp.request.LoginRequest;
import ba.atlant.auctionapp.request.RegisterRequest;
import ba.atlant.auctionapp.response.AuthResponse;
import ba.atlant.auctionapp.service.PersonService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@Tag(name = "Person Controller")
@CrossOrigin("*")
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
    public ResponseEntity<AuthResponse> logIn(@Valid @RequestBody LoginRequest loginRequest) {
        AuthResponse authResponse = personService.login(loginRequest);
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/register")
    @Operation(summary = "Registration of users")
    public ResponseEntity<AuthResponse> createAccount(@Valid @RequestBody RegisterRequest signUpRequest) {
        AuthResponse authResponse = personService.register(signUpRequest);
        return ResponseEntity.ok(authResponse);
    }

    @GetMapping(value = "/current")
    @Operation(summary = "Get info for currently logged user", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<PersonProjection> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        return personService.getCurrentUser(authHeader);
    }

    @PutMapping(value = "/current")
    @Operation(summary = "Change info for currently logged user", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<PersonDTO> modifyCurrentUser(@RequestHeader("Authorization") String authHeader,
                                                       @Valid @RequestBody PersonDTO personDTO) {
        return personService.modifyCurrentUser(authHeader, personDTO);
    }

    @PutMapping(value = "/picture", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Operation(summary = "Insert picture link for user", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Person> addPictureToUser(@RequestHeader("Authorization") String authHeader,
                                                   @RequestBody MultipartFile file) throws IOException {
        return personService.addPictureToUser(authHeader,file);
    }

    @GetMapping(value = "/picture")
    @Operation(summary = "Get picture link for user", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Map<String,String>> getUserPicture(@RequestHeader("Authorization") String authHeader) {
        return personService.getUserPicture(authHeader);
    }

    @GetMapping(value = "/phone-number")
    @Operation(summary = "Get phone number for user", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Map<String, String>> getUserPhoneNumber(@RequestParam("userId") Long userId) {
        return personService.getUserPhoneNumber(userId);
    }

    @PatchMapping(value = "/deactivate")
    @Operation(summary = "User activation of account", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity deactivateUserAccount(@RequestHeader("Authorization") String authHeader) {
        return personService.deactivateUserAccount(authHeader);
    }
}