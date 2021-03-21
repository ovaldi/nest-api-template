import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@/services/auth.service';
import { UserCreateDto } from '@/dto/user.create.dto';
import { UserSignInDto } from '@/dto/user.signin.dto';
import { Controller, Post, Body, Request, UseGuards, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiForbiddenResponse } from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @ApiTags('Auth')
  @Post('/auth/signin')
  @UseGuards(AuthGuard('local'))
  @ApiOkResponse({
    schema: {
      properties: {
        token: {
          type: 'string',
        }
      }
    }
  })
  @ApiBadRequestResponse()
  @ApiBody({ type: UserSignInDto })
  signin(@Request() req: Dais.Request): { token: string } {
    if (req.user) {
      const token = this.authService.sign(req.user);
      return { token };
    }
    throw new ForbiddenException('Forbidden');
  }

  @ApiTags('Auth')
  @Post('/auth/signup')
  @ApiCreatedResponse({ description: 'Successful' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async signup(@Body() dto: UserCreateDto): Promise<void> {
    await this.authService.signup(dto);
  }

  @ApiTags('Auth')
  @Post('/admin/auth/signin')
  @UseGuards(AuthGuard('local'))
  @ApiOkResponse({
    schema: {
      properties: {
        token: {
          type: 'string',
        },
      },
    },
  })
  @ApiBadRequestResponse()
  @ApiBody({ type: UserSignInDto })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  admin(@Request() req: Dais.Request): { token: string } {
    if (req.user && req.user.role === Dais.Role.Admin) {
      const token = this.authService.sign(req.user);
      return { token };
    }
    throw new ForbiddenException('Forbidden');
  }
}
