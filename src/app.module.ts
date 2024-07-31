import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { Message } from './messages/message.entity';
import { User } from './users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1231230', 
      database: 'chatdb',
      entities: [Message, User],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    MessagesModule
  ]
})
export class AppModule {}