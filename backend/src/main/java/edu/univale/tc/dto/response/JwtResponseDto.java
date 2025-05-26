package edu.univale.tc.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data   
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponseDto {
    private long id;
    private String username;
    private String email;
    private String token;
}
