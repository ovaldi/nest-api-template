import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, MaxLength } from 'class-validator';

export class UserSignInDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(128)
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(20)
  readonly password: string;
}
