package edu.univale.tc.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({ ResourceNotFoundException.class })
    public ResponseEntity<ResponseError> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        ResponseError error = new ResponseError(HttpStatus.NOT_FOUND.value(), ex.getMessage(), LocalDateTime.now());
        return ResponseEntity.status(404).body(error);
    }

    @ExceptionHandler({ InvalidCredentialsException.class })
    public ResponseEntity<ResponseError> handleInvalidCredentialsException(InvalidCredentialsException ex, WebRequest request) {
        ResponseError error = new ResponseError(HttpStatus.UNAUTHORIZED.value(), ex.getMessage(), LocalDateTime.now());
        return ResponseEntity.status(401).body(error);
    }

    @ExceptionHandler({ IllegalArgumentException.class })
    public ResponseEntity<ResponseError> handleIllegalArgumentException(IllegalArgumentException ex, WebRequest request) {
        ResponseError error = new ResponseError(HttpStatus.UNPROCESSABLE_ENTITY.value(), ex.getMessage(), LocalDateTime.now());
        return ResponseEntity.status(422).body(error);
    }
}
