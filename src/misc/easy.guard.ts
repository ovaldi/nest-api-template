import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EasyGuard extends AuthGuard('jwt') {
  handleRequest(_err: any, user: any) {
    return user;
  }
}
