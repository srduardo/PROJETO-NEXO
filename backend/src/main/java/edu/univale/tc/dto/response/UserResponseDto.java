package edu.univale.tc.dto.response;

import edu.univale.tc.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponseDto {
    private String username;
    private String email;

    public UserResponseDto (User user) {
        this.username = user.getUsername();
        this.email = user.getEmail();
    }
}
