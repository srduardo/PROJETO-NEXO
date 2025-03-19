package edu.univale.tc.exceptions;

import java.time.LocalDateTime;

public record ResponseError(int code, String message, LocalDateTime timestamp) {
}
