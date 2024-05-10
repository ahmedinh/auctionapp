package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.config.jwt.JwtUtils;
import ba.atlant.auctionapp.dto.CreditCardDTO;
import ba.atlant.auctionapp.dto.PersonDTO;
import ba.atlant.auctionapp.enumeration.Role;
import ba.atlant.auctionapp.exception.EmailAlreadyUsedException;
import ba.atlant.auctionapp.model.CreditCard;
import ba.atlant.auctionapp.model.Person;
import ba.atlant.auctionapp.projection.PersonProjection;
import ba.atlant.auctionapp.repository.CreditCardRepository;
import ba.atlant.auctionapp.repository.PersonRepository;
import ba.atlant.auctionapp.request.AuthRequest;
import ba.atlant.auctionapp.request.LoginRequest;
import ba.atlant.auctionapp.request.RegisterRequest;
import ba.atlant.auctionapp.response.AuthResponse;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

@Service
public class PersonService {
    final AuthenticationManager authenticationManager;
    final JwtUtils jwtUtils;
    private final PersonRepository personRepository;
    private final PasswordEncoder passwordEncoder;
    private final CreditCardRepository creditCardRepository;
    private final S3Service s3Service;

    public PersonService(PersonRepository personRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtils jwtUtils, CreditCardRepository creditCardRepository, S3Service s3Service) {
        this.personRepository = personRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.creditCardRepository = creditCardRepository;
        this.s3Service = s3Service;
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
        Person person = personRepository.save(new Person(registerRequest.getFirstName(), registerRequest.getLastName(), registerRequest.getEmail(), passwordEncoder.encode(registerRequest.getPassword()), Role.ROLE_USER));
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
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
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

    Integer getUserId(String authHeader) {
        String token = authHeader.substring(7);
        return jwtUtils.getUserIdFromJwtToken(token);
    }

    public ResponseEntity<PersonProjection> getCurrentUser(String authHeader) {
        Integer userId = getUserId(authHeader);
        personRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new ResourceNotFoundException("No user found with provided ID."));
        PersonProjection personProjection = personRepository.getPersonInformation(Long.valueOf(userId.toString()));
        return ResponseEntity.ok(personProjection);
    }

    private void updateCreditCardInfo(CreditCardDTO creditCardDTO, Person person) {
        if (creditCardDTO != null) {
            CreditCard creditCard = new CreditCard(
                    creditCardDTO.getCardName(),
                    creditCardDTO.getCardNumber(),
                    creditCardDTO.getExpirationMonth(),
                    creditCardDTO.getExpirationYear(),
                    creditCardDTO.getCvc(), person);
            creditCardRepository.save(creditCard);
        }
    }

    @Transactional
    public ResponseEntity<PersonDTO> modifyCurrentUser(String authHeader, PersonDTO personDTO) {
        try {
            Integer userId = getUserId(authHeader);
            Person person = personRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new ResourceNotFoundException("No user found with provided ID."));
            person.setFirstName(personDTO.getFirstName());
            person.setLastName(personDTO.getLastName());
            person.setBirthDate(LocalDate.of(personDTO.getBirthYear(), personDTO.getBirthMonth(), personDTO.getBirthDay()));
            person.setPhoneNumber(personDTO.getPhoneNumber());
            person.setShippingAddress(personDTO.getShippingStreet());
            person.setZipCode(personDTO.getShippingZipCode());
            person.setShippingCity(personDTO.getShippingCity());
            person.setState(personDTO.getShippingState());
            person.setCountry(personDTO.getShippingCountry());
            updateCreditCardInfo(personDTO.getCreditCardDTO(), person);
            personRepository.save(person);
            return ResponseEntity.ok(personDTO);
        } catch (Exception e) {
            System.out.println("Error modifying user: " + e.getMessage());
            throw e;
        }
    }

    @Transactional
    public ResponseEntity<Person> addPictureToUser(String authHeader, MultipartFile file) throws IOException {
        Integer userId = getUserId(authHeader);
        Person person = personRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new ResourceNotFoundException("No user found with provided ID."));
        s3Service.deleteObject(person.getPictureUrl());
        s3Service.uploadFile(file.getOriginalFilename(), file);
        person.setPictureUrl(s3Service.getBucketName(), s3Service.getRegion(), file.getOriginalFilename());
        personRepository.save(person);
        return ResponseEntity.ok(person);
    }

    public ResponseEntity<Map<String, String>> getUserPicture(String authHeader) {
        Integer userId = getUserId(authHeader);
        Person person = personRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new ResourceNotFoundException("No user found with provided ID."));
        Map<String, String> personPictureUrl = new HashMap<>();
        personPictureUrl.put("url", person.getPictureUrl());
        return ResponseEntity.ok(personPictureUrl);
    }
}