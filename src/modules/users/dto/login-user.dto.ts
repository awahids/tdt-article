import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'HhS6B@example.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password123!@#' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
