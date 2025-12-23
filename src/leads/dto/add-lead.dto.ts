import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, MinLength, Min } from 'class-validator';

export class AddLeadDto {
  @ApiProperty({
    description: 'First name of the lead',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'First name must be at least 2 characters long' })
  firstName: string;

  @ApiProperty({
    description: 'Last name of the lead',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  lastName: string;

  @ApiProperty({
    description: 'Price associated with the lead',
    example: 50000,
    minimum: 0,
  })
  @IsNumber()
  @Min(0, { message: 'Price must be a positive number' })
  price: number;

  @ApiProperty({
    description: 'Address of the lead',
    example: '123 Main Street',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Address must be at least 5 characters long' })
  address: string;

  @ApiProperty({
    description: 'State of the lead',
    example: 'California',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'State must be at least 2 characters long' })
  state: string;

  @ApiProperty({
    description: 'City of the lead',
    example: 'Los Angeles',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'City must be at least 2 characters long' })
  city: string;
}

