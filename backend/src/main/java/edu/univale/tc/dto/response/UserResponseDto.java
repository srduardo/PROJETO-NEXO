package edu.univale.tc.dto.response;

import edu.univale.tc.domain.User;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponseDto {
    @Min(1)
    private long id;
    @NotBlank
    @Size(max = 100)
    private String username;
    @NotBlank
    @Size(max = 200)
    private String email;

    public UserResponseDto (User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
    }
}
