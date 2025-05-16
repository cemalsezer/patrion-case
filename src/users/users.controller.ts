import { Controller, Get, Param, Patch, Body, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';        
import { RolesGuard } from '../common/guards/roles.guard';     
import { Roles } from '../common/decorators/roles.decorator';
import { Request } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common'; 
import { ApiBearerAuth, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { ChangePasswordDto } from '../auth/dto/change-password.dto'; // Import the ChangePasswordDto
import { UpdateUserDto } from '../auth/dto/update-user.dto';




@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) 
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get()
  @Roles('SystemAdmin') 
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users (admin only)' }) 
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  getProfile(@Request() req) {
    const userId = Number(req.user.userId);
    if (isNaN(userId)) {
      throw new BadRequestException('Geçersiz kullanıcı ID');
    }
    return this.usersService.findOne(userId);
  }

    @Patch('me')
    async updateProfile(@Request() req, @Body() body: any) {
    const id = Number(req.user.userId);
    if (isNaN(id)) {
      throw new BadRequestException('Geçersiz kullanıcı ID');
    }
    return this.usersService.update(id, body);
  }

  @Patch('me/password')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change user password' })
  @ApiBody({ type: ChangePasswordDto })
  async updatePassword(@Request() req, @Body() body: any) {
  const userId = Number(req.user.userId);
  if (isNaN(userId)) {
    throw new BadRequestException('Geçersiz kullanıcı ID');
  }

  const { currentPassword, newPassword, confirmPassword } = body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new BadRequestException('Tüm alanlar zorunludur');
  }

  if (newPassword !== confirmPassword) {
    throw new BadRequestException('Yeni şifreler uyuşmuyor');
  }

  return this.usersService.changePassword(userId, currentPassword, newPassword);
}

  @Get(':id')
  @Roles('SystemAdmin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by ID (admin only)' })
  @ApiParam({ name: 'id', required: true, example: 2 })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @Roles('SystemAdmin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user by ID (admin only)' })
  @ApiParam({ name: 'id', required: true, example: 2 })
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id') id: string, @Body() body: any) {
    return this.usersService.update(+id, body);
  }

  @Delete(':id')
  @Roles('SystemAdmin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user by ID (admin only)' })
  @ApiParam({ name: 'id', required: true, example: 2 })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id); 
  }

}
