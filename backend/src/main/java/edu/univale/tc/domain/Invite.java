package edu.univale.tc.domain;

import edu.univale.tc.dto.request.InviteRequestDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Invite {
    private String receiverEmail;
    private long squadId;
    private long senderId;
    private String inviteToken;

    public Invite(InviteRequestDto inviteRequestDto, User sender) {
        this.receiverEmail = inviteRequestDto.getReceiverEmail();
        this.squadId = inviteRequestDto.getSquadId();
        this.senderId = sender.getId();
    }
}
