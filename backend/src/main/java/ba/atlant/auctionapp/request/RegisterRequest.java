package ba.atlant.auctionapp.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class RegisterRequest {

    @NotBlank(message = "First name can't be empty")
    @Size(min = 2, message = "First name must have at least 2 characters")
    @Size(max = 30, message = "First name can't be longer than 50 characters")
    private String firstName;

    @NotBlank(message = "Last name can't be empty")
    @Size(min = 2, message = "First name must have at least 2 characters")
    @Size(max = 30, message = "First name can't be longer than 50 characters")
    private String lastName;

    @NotBlank(message = "Email can't be empty")
    @Email(message = "Email format is not valid")
    @Size(max = 320, message = "Email can't be longer than 320 characters")
    private String email;

    @NotBlank(message = "Password can't be empty")
    @Size(min = 8, message = "Password must contain at least 8 characters")
    @Size(max = 255, message = "Password can't be longer than 255 characters")
    private String password;

    @NotBlank(message = "Username cannot be blank.")
    @NotNull(message = "Username cannot be null.")
    @Column(nullable = false, unique = true)
    private String username;

    @NotNull(message = "Birth date cannot be null.")
    @Column(name = "birth_date")
    private LocalDate birthDate;

    public RegisterRequest() {
    }

    public RegisterRequest(@NotBlank(message = "First name can't be empty") String firstName,
                           @NotBlank(message = "Last name can't be empty") String lastName,
                           @NotBlank(message = "Email can't be empty")
                           @Email(message = "Email format is not valid") String email,
                           @NotBlank(message = "Password can't be empty")
                           @Size(min = 8, message = "Password must contain at least 8 characters") String password, String username, LocalDate birthDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.username = username;
        this.birthDate = birthDate;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }
}