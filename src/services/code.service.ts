import _ from 'lodash';
import { SES } from 'aws-sdk';
import { send } from '@/misc/ses';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeEntity } from '@/entities/code.entity';
import { UserEntity } from '@/entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';

const random = () => {
  return (((1 + Math.random()) * 0x1000000) | 0).toString(16).substring(1).toUpperCase();
};

@Injectable()
export class CodeService {
  constructor(
    @InjectRepository(CodeEntity)
    private readonly repo: Repository<CodeEntity>,
    @InjectRepository(UserEntity)
    private readonly user: Repository<UserEntity>,
  ) {}

  async send(to: string): Promise<void> {
    const user = await this.user.findOne({ email: to, is_deleted: 0 });
    if (_.isEmpty(user)) {
      throw new BadRequestException();
    }
    
    const code = random();
    const message: SES.Message = {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `<b>${code}</b>`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'GPS - Verification Code',
      },
    };

    await this.repo.manager.transaction(async db => {
      await db.insert(CodeEntity, { code, email: to });
      await send(message, to);
    });
  }
}
