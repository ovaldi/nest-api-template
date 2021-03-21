import * as env from '@/misc/env';
import { services } from './services';
import { entities } from './entities';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppService } from './app.service';
import { controllers } from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@/misc/jwt.strategy';
import { LocalStrategy } from '@/misc/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature(entities),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: env.get('JWT_SECRET_KEY'),
      signOptions: { expiresIn: '365d' },
    }),
  ],
  providers: [
    ...services,
    AppService, JwtStrategy, LocalStrategy,
  ],
  controllers: [
    ...controllers,
    AppController,
  ],
})
export class AppModule {}
