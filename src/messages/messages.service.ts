import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { User } from '../users/users.entity';
import { CreateMessageDto } from './create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<any[]> {
    const messages = await this.messageRepository.find();
    return Promise.all(messages.map(async (message) => {
      const user = await this.userRepository.findOne({ where: { id: message.senderId } });
      return {
        ...message,
        senderUsername: user ? user.username : 'Unknown',
      };
    }));
  }

  async create(createMessageDto: CreateMessageDto): Promise<any> {
    const message = this.messageRepository.create(createMessageDto);
    await this.messageRepository.save(message);

    const user = await this.userRepository.findOne({ where: { id: createMessageDto.senderId } });

    return {
      ...message,
      senderUsername: user ? user.username : 'Unknown',
    };
  }
} 