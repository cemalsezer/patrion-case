import { Controller, Get, Param, Patch, Body, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';        
import { RolesGuard } from '../common/guards/roles.guard';     
import { Roles } from '../common/decorators/roles.decorator';
import { Request } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common'; 

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) // ✅ İKİ guard birlikte
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('SystemAdmin') 
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  getProfile(@Request() req) {
    const userId = Number(req.user.userId);
    if (isNaN(userId)) {
      throw new BadRequestException('Geçersiz kullanıcı ID');
    }
    return this.usersService.findOne(userId);
  }

  @Get(':id')
  @Roles('SystemAdmin')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @Roles('SystemAdmin')
  update(@Param('id') id: string, @Body() body: any) {
    return this.usersService.update(+id, body);
  }

  @Delete(':id')
  @Roles('SystemAdmin')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id); 
  }

}
