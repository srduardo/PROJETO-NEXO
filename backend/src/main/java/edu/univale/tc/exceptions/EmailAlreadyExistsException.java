package edu.univale.tc.exceptions;

public class EmailAlreadyExistsException extends RuntimeException{
    public EmailAlreadyExistsException() {
        super("Este email já existe!");
    }

    public EmailAlreadyExistsException(String message) {
        super(message);
    }
}
