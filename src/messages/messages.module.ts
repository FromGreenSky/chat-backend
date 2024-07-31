import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { User } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, User])],
  providers: [MessagesService, MessagesGateway],
  exports: [MessagesService],
})
export class MessagesModule {}