import { Strategy } from 'passport-local';
import { UserEntity } from '@/entities/user.entity';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '@/services/auth.service';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<Pick<UserEntity, "id" | "email">> {
    const user = await this.authService.validate(email, password);
    if (user) {
      return user;
    }
    throw new BadRequestException('email/password is invalid');
  }
}
