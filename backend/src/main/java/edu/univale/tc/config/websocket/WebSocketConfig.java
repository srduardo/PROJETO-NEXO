package edu.univale.tc.config.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer { // WebSocketMessageBrokerConfigurer -> usado para configurar os websockets com suporte ao protocolo stomp

    @Autowired
    private WebSocketAuthInterceptor webSocketAuthInterceptor;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) { // Regristro do endpoint principal do protocolo stomp
        registry
        .addEndpoint("/ws") // define o endpoint principal do websocket
        .setAllowedOriginPatterns("*"); // define quais sites ou origens podem acessar o endpoint -> /ws
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) { // MessageBroker -> usado para gerenciar e redirecionar as mensagens do websocket
        registry.enableSimpleBroker("/topic", "/queue"); // define os prefixos que o broker interno usará para se comunicar com o cliente (server -> client)

        registry.setApplicationDestinationPrefixes("/app"); // prefixo de comunicação para o cliente enviar mensagens para o servidor

        registry.setUserDestinationPrefix("/user"); // prefixo de comunicação privada para o servidor enviar mensagens para um cliente/usuário
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) { // 
        registration.interceptors(webSocketAuthInterceptor); // define os interceptadores de comunicação do websocket
    }
}
