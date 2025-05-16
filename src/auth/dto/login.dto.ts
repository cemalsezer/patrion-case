import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'cemal2' })
  username: string;

  @ApiProperty({ example: '654321' })
  password: string;
}
