import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLog } from './user-log.entity';

@Injectable()
export class UserLogService {
  constructor(
    @InjectRepository(UserLog)
    private logRepo: Repository<UserLog>,
  ) {}

  async createLog(userId: number, action: string) {
    const log = this.logRepo.create({ userId, action });
    return this.logRepo.save(log);
  }
}
