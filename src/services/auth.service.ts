import * as pwd from '@/misc/pwd';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/entities/user.entity';
import { UserCreateDto } from '@/dto/user.create.dto';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly user: Repository<UserEntity>,
    private readonly jwt: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<Pick<UserEntity, 'id' | 'role' | 'email'> | undefined> {
    const user = await this.user.findOne({
      email: email.trim(),
      is_deleted: 0,
    });

    if (user && pwd.hash(password) === user.password) {
      return {
        id: user.id,
        role: user.role,
        email: user.email,
      };
    }
  }

  sign(user: Pick<UserEntity, "id" | "role" | "email">): string {
    return this.jwt.sign({
      sub: user.id,
      role: user.role,
      email: user.email,
    });
  }

  async signup(dto: UserCreateDto): Promise<void> {
    const exist = await this.user.findOne({ email: dto.email });
    if (exist) {
      throw new BadRequestException('email address already exists');
    }
    await this.user.save({
      ...dto,
      password: pwd.hash(dto.password || pwd.random()),
    });
  }
}
