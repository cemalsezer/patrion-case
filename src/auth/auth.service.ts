import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
  const existing = await this.userRepo.findOne({ where: { username } });

  if (existing) {
    throw new ConflictException('Bu kullanıcı adı zaten alınmış');
  }

  const hash = await bcrypt.hash(password, 10);
  const user = this.userRepo.create({ username, password: hash, role: 'User' });
  await this.userRepo.save(user);

  return { message: 'Kullanıcı başarıyla oluşturuldu', user };
}

 async validateUser(username: string, password: string) {
  const user = await this.userRepo.findOne({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Kullanıcı adı veya şifre hatalı');
  }

  const { password: _, ...result } = user;
  return result;
}

async login(user: Partial<User>) {
  const payload = {
    username: user.username,
    sub: user.id,
    role: user.role,
  };

  return {
    message: 'Giriş başarılı',
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    token: this.jwtService.sign(payload),
  };
}

}
