import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Username for the user account',
    example: 'john_doe',
    minLength: 3,
  })
  @IsString()
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  userName: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'password123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({
    description: 'Password confirmation (must match password)',
    example: 'password123',
    minLength: 6,
  })
  @IsString()
  confirmPassword: string;
}

