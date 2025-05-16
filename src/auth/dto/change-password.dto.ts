import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ example: 'oldPassword123' })
  currentPassword: string;

  @ApiProperty({ example: 'newPassword456' })
  newPassword: string;

  @ApiProperty({ example: 'newPassword456' })
  confirmPassword: string;
}
