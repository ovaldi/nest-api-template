import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UserCreateDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(128)
  readonly email: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: '0: unknown, 1: male, 2: female' })
  @IsIn([Dais.Gender.Male, Dais.Gender.Female, Dais.Gender.Unknown])
  readonly gender: 0 | 1 | 2;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly graduate: number;

  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(20)
  readonly password: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  readonly school_id: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(256)
  readonly bio?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(128)
  readonly name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(128)
  readonly major?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(256)
  readonly avatar?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false })
  readonly birthday?: Date;
}
