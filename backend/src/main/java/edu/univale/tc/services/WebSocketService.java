package edu.univale.tc.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import edu.univale.tc.dto.response.InviteResponseDto;

@Service
public class WebSocketService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void sendInvite(String receiverEmail, InviteResponseDto invite) {
        if (receiverEmail == null || invite == null) throw new IllegalArgumentException("Erro ao enviar convite!");
        System.out.println("Enviando convite para: " + receiverEmail);
        messagingTemplate.convertAndSendToUser(receiverEmail, "/queue/invites", invite);
    }
    
}
