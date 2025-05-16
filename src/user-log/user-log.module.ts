import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLog } from './user-log.entity';
import { UserLogService } from './user-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserLog])],
  providers: [UserLogService],
  exports: [UserLogService],
})
export class UserLogModule {}
