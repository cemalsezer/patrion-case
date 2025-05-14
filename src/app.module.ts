import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller'; 

@Module({
  imports: [AuthModule],
  controllers: [AppController, UsersController], // bu hatayı düzelt
  providers: [AppService],
})
export class AppModule {}
