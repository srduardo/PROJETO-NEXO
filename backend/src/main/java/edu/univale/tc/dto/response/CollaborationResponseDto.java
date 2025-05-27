package edu.univale.tc.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CollaborationResponseDto {
    private long squadId;
    private String squadName;
    private String ownerName;
    private int membersAmount;
}
