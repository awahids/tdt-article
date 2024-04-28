import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength, Matches, IsUUID } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name must contain only letters and spaces',
  })
  name: string;

  @ApiProperty({ example: 'HhS6B@example.com' })
  @IsString()
  @IsEmail()
  @MinLength(5)
  email: string;

  @ApiProperty({ example: 'Password123!@#' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[A-Z])/, { message: 'password must contain at least one uppercase letter' })
  @Matches(/^(?=.*[\d\W])/, { message: 'password must contain at least one number or symbol', })
  password: string;

  @ApiProperty({ example: 'Role UUID' })
  @IsUUID()
  @IsNotEmpty()
  roleId: string;
}
