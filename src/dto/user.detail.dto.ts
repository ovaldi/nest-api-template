import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsNotEmpty, IsString, IsInt, IsDateString } from 'class-validator';

export class UserDetailDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly bio: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly major: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly avatar: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly gender: 0 | 1 | 2;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly graduate: number;

  @ApiProperty()
  @IsDateString()
  readonly birthday: Date;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  readonly school_id: number;

  @ApiProperty()
  @IsDateString()
  readonly created_at: Date;

  @ApiProperty()
  @IsDateString()
  readonly updated_at: Date;
}
