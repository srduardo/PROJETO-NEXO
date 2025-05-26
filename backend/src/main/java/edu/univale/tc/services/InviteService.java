package edu.univale.tc.services;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.univale.tc.domain.Invite;
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

    private final Map<String, Invite> inviteStorage = new ConcurrentHashMap<>(); 

    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();

    public void createInvite(InviteRequestDto inviteRequestDto, String auth) {
        if (inviteRequestDto == null || auth == null) throw new IllegalArgumentException("Erro ao enviar convite!");

        User sender = getUserByJwt(auth);
        String inviteToken = UUID.randomUUID().toString();
        
        Invite invite = new Invite(inviteRequestDto, sender);
        invite.setInviteToken(inviteToken);

        inviteStorage.put(inviteToken, invite);
        scheduler.schedule(() -> inviteStorage.remove(inviteToken), 30, TimeUnit.SECONDS);

        webSocketService.sendInvite(inviteRequestDto.getReceiverEmail(), invite);
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
