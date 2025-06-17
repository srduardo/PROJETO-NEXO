package edu.univale.tc.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.univale.tc.domain.Squad;
import edu.univale.tc.domain.User;
import edu.univale.tc.dto.request.AcceptRequestDto;
import edu.univale.tc.dto.request.InviteRequestDto;
import edu.univale.tc.dto.response.InviteResponseDto;
import edu.univale.tc.services.security.JwtService;

@Service
public class InviteService {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @Autowired
    private WebSocketService webSocketService;

    @Autowired
    private CollaborationService collaborationService;

    @Autowired
    private SquadService squadService;

    public void createInvite(InviteRequestDto inviteRequestDto, String auth) {
        if (inviteRequestDto == null || auth == null) throw new IllegalArgumentException("Erro ao enviar convite!");
        System.out.println("Log");
        userService.findUserByEmail(inviteRequestDto.getReceiverEmail());
        User sender = getUserByJwt(auth);
        
        Squad squad = squadService.findSquadById(inviteRequestDto.getSquadId());
        InviteResponseDto inviteResponse = new InviteResponseDto(sender.getUsername(), squad.getName(), squad.getId());
        System.out.println("Log 2");
        webSocketService.sendInvite(inviteRequestDto.getReceiverEmail(), inviteResponse);
    }

    public User getUserByJwt(String jwt) {
        String token = jwt.replace("Bearer ", "");
        String email = jwtService.extractEmail(token);

        User sender = userService.findUserByEmail(email);
        
        return sender;
    }

    public InviteResponseDto acceptInvite(AcceptRequestDto acceptRequestDto, String auth) {
        if (acceptRequestDto == null || auth == null) throw new IllegalArgumentException("Erro ao aceitar convite!");
        
        User receiver = getUserByJwt(auth);

        collaborationService.createNewCollaboration(receiver.getId(), acceptRequestDto.getSquadId(), "MEMBER");

        return null;
    }
}
