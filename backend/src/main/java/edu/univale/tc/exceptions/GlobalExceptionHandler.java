package edu.univale.tc.exceptions;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    private final MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter;

    public GlobalExceptionHandler(MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter) {
        this.mappingJackson2HttpMessageConverter = mappingJackson2HttpMessageConverter;
    }

    @ExceptionHandler({ ResourceNotFoundException.class })
    public ResponseEntity<ResponseError> handleResourceNotFoundException(Exception ex, WebRequest request) {
        return new ResponseEntity<>(
                new ResponseError(HttpStatus.NOT_FOUND.value(), ex.getMessage(), LocalDateTime.now()),
                new HttpHeaders(),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler({ EmailAlreadyExistsException.class })
    public ResponseEntity<ResponseError> handleEmailAlreadyExistisException(Exception ex, WebRequest request) {
        return new ResponseEntity<>(
                new ResponseError(HttpStatus.UNAUTHORIZED.value(), ex.getMessage(), LocalDateTime.now()),
                new HttpHeaders(),
                HttpStatus.UNAUTHORIZED
        );
    }

    @ExceptionHandler({ InvalidCredentialsException.class })
    public ResponseEntity<ResponseError> handleInvalidCredentialsException(Exception ex, WebRequest request) {
        return new ResponseEntity<>(
                new ResponseError(HttpStatus.UNAUTHORIZED.value(), ex.getMessage(), LocalDateTime.now()),
                new HttpHeaders(),
                HttpStatus.UNAUTHORIZED
        );
    }
}
