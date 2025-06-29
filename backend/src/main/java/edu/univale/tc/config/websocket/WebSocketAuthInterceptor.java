package edu.univale.tc.config.websocket;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;

import edu.univale.tc.services.security.JwtService;

@Component
public class WebSocketAuthInterceptor implements ChannelInterceptor{
    
    @Autowired
    private JwtService jwtService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            String auth = accessor.getFirstNativeHeader("Authorization");

            if (auth != null && auth.startsWith("Bearer ")) {
                String token = auth.replace("Bearer ", "");

                String email = jwtService.extractEmail(token);

                accessor.setUser(new UsernamePasswordAuthenticationToken(email, null, List.of()));
                accessor.getSessionAttributes().put("userEmail", email);
            }
        }

        return message;
    }    
}
