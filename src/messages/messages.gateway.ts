import { WebSocketGateway, OnGatewayInit, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './create-message.dto';

@WebSocketGateway({ cors: { origin: 'http://localhost:5174' } }) // Додайте CORS, якщо потрібно
export class MessagesGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.messagesService.create(createMessageDto);
    this.server.emit('message', message);
    return message;
  }
}