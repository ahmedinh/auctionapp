package ba.atlant.auctionapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    private Map<String, String> getReturnMap(String message) {
        Map<String, String> map = new HashMap<>();
        map.put("error_message",message);
        return map;
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleException(Exception e) {
        return new ResponseEntity<>(getReturnMap("An unexpected error occurred: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, String>> handleBadCredentials(Exception e) {
        return new ResponseEntity<>(getReturnMap(e.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EmailAlreadyUsedException.class)
    public ResponseEntity<Map<String, String>> handleUsedEmail(Exception e) {
        return new ResponseEntity<>(getReturnMap(e.getMessage()), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(IOException.class)
    public ResponseEntity<Map<String, String>> handleIOException(Exception e) {
        return new ResponseEntity<>(getReturnMap(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Map<String, String>> handleAccessDenied(Exception e) {
        return new ResponseEntity<>(getReturnMap(e.getMessage()), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        List<ObjectError> allErrors = ex.getBindingResult().getAllErrors();

        for (ObjectError error : allErrors) {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        }

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}