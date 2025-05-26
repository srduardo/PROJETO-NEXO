package edu.univale.tc.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRequestDto {
    @NotBlank
    @Size(max = 100)
    private String username;
    @NotBlank
    @Size(max = 200)
    @Email
    private String email;
    @NotBlank
    @Size(min = 6)
    private String password;
}
