package ba.atlant.auctionapp.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class LoginRequest extends AuthRequest {
    @NotBlank(message = "Email can't be empty")
    @Email(message = "Email format is not valid")
    private String email;

    @NotBlank(message = "Password can't be empty")
    @Size(min = 8, message = "Password must contain at least 8 characters")
    private String password;

    public LoginRequest() {
    }

    public LoginRequest(@NotBlank(message = "Email can't be empty") @Email(message = "Email format is not valid")
                        String email, @NotBlank(message = "Password can't be empty")
                        @Size(min = 8, message = "Password must contain at least 8 characters") String password) {
        this.email = email;
        this.password = password;
    }

    @Override
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}