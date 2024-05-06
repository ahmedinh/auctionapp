package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.config.jwt.JwtUtils;
import ba.atlant.auctionapp.enumeration.Role;
import ba.atlant.auctionapp.exception.EmailAlreadyUsedException;
import ba.atlant.auctionapp.model.Person;
import ba.atlant.auctionapp.repository.PersonRepository;
import ba.atlant.auctionapp.request.AuthRequest;
import ba.atlant.auctionapp.request.LoginRequest;
import ba.atlant.auctionapp.request.RegisterRequest;
import ba.atlant.auctionapp.response.AuthResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {
    final AuthenticationManager authenticationManager;
    final JwtUtils jwtUtils;
    private final PersonRepository personRepository;
    private final PasswordEncoder passwordEncoder;

    public PersonService(PersonRepository personRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.personRepository = personRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    public ResponseEntity<String> addUser(Person person) {
        personRepository.save(person);
        return ResponseEntity.ok("Person successfully added.");
    }

    public ResponseEntity<List<Person>> getAllUsers() {
        List<Person> personList = personRepository.findAll();
        return ResponseEntity.ok(personList);
    }

    public AuthResponse register(RegisterRequest registerRequest) {
        if (personRepository.existsByEmail(registerRequest.getEmail())) {
            throw new EmailAlreadyUsedException("Email already in use");
        }
        Person person = personRepository.save(new Person(
                registerRequest.getFirstName(),
                registerRequest.getLastName(),
                registerRequest.getEmail(),
                passwordEncoder.encode(registerRequest.getPassword()),
                registerRequest.getBirthDate(),
                Role.ROLE_USER
        ));
        return getAuthResponse(registerRequest, person);
    }

    public AuthResponse login(LoginRequest loginRequest) {
        Person person = personRepository.findByEmail(loginRequest.getEmail()).orElse(null);
        if (person == null || !passwordEncoder.matches(loginRequest.getPassword(), person.getPassword())) {
            throw new BadCredentialsException("Wrong email or password");
        }
        return getAuthResponse(loginRequest, person);
    }

    private AuthResponse getAuthResponse(AuthRequest authRequest, Person person) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        person.setPassword(null);
        return new AuthResponse(person, jwt);
    }

    public Boolean existsByEmail(String email) {
        return personRepository.existsByEmail(email);
    }
    public Person getByEmail(String email) {
        return personRepository.findByEmail(email).orElse(null);
    }
}
