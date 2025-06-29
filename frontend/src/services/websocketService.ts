import { Client, type IMessage } from '@stomp/stompjs';
import type { ConviteResponse } from '../types/ConviteResponse';

export const connectWebSocket = (jwtToken: string, onInvite: (convite: ConviteResponse) => void) => {
  const client = new Client({
    brokerURL: 'ws://localhost:8080/ws',
    connectHeaders: {
      Authorization: `Bearer ${jwtToken}`,
    },
    onConnect: () => {
      console.log('Conectado ao WebSocket!');
      client.subscribe('/user/queue/invites', (message: IMessage) => {
        const body: ConviteResponse = JSON.parse(message.body);
        console.log('Mensagem recebida:', body);
        onInvite(body);
      });
    },
    onStompError: (frame) => {
      console.error('Erro STOMP:', frame.headers['message']);
      console.error('Detalhes:', frame.body);
    },
  });

  client.activate();

  return client;
};