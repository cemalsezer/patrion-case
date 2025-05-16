import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { MqttModule } from './mqtt/mqtt.module';
import { SensorModule } from './sensor/sensor.module';
import { UserLogModule } from './user-log/user-log.module';
import { UserLog } from './user-log/user-log.entity';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User,UserLog],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    MqttModule,
    SensorModule,
    UserLogModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
