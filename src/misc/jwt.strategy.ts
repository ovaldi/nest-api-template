import * as env from '@/misc/env';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: env.get('JWT_SECRET_KEY'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  validate(payload: {
    sub: number,
    role: Dais.Role.User | Dais.Role.Admin,
    email: string,
  }): {
    id: number,
    role: Dais.Role.User | Dais.Role.Admin,
    email: string,
  } {
    return {
      id: payload.sub,
      role: payload.role,
      email: payload.email,
    };
  }
}
