package edu.univale.tc.dto.response;

import edu.univale.tc.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponseDto {
    private long id;
    private String username;
    private String email;
    private String jwt;

    public UserResponseDto (User user, String jwt) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.jwt = jwt;
    }
}
