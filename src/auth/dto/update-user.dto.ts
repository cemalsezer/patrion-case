import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'newUsername' })
  username?: string;

  @ApiPropertyOptional({ example: 'SystemAdmin' })
  role?: string;

  @ApiPropertyOptional({ example: 'newPassword123' })
  password?: string;
}
