import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    
    return {
      accessToken,
      id: user.id,
      name: username
    };
  }
  async register(registerDto: RegisterDto): Promise<any> {
    const { username, password } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ username, password: hashedPassword });
    await this.userRepository.save(user);
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
      id: user.id,
      name: user.username,
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}