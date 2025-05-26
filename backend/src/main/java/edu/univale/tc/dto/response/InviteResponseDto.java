package edu.univale.tc.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InviteResponseDto {
    private String senderName;
    private String squadName;
    private long squadId;
}
