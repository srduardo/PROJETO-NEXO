package edu.univale.tc.dto.response;

import edu.univale.tc.domain.Squad;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SquadResponseDto {
    private long squadId;
    private String squadName;
    private long ownerId;
    private String ownerName;
    private int membersAmount;

    public SquadResponseDto(Squad squad) {
        this.squadId = squad.getId();
        this.squadName = squad.getName();
        this.ownerId = squad.getOwnerId().getId();
        this.ownerName = squad.getOwnerId().getUsername();
        this.membersAmount = squad.getCollaboration().size();
    }
}
