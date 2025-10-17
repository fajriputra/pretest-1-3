/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  Req,
  HttpCode,
} from '@nestjs/common';
import type { Request, Response } from 'express';

import { AuthFormValuesDto } from './dto/auth.dto';

import { AuthService } from './auth.service';
import { UserService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  async register(
    @Body()
    body: AuthFormValuesDto,
  ) {
    const user = await this.userService.createUser(body);

    return {
      message: 'User registered successfully',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        telp: user.telp,
      },
      status: 201,
    };
  }

  @HttpCode(200)
  @Post('login')
  async login(
    @Body() body: Pick<AuthFormValuesDto, 'username' | 'password'>,
    @Res() res: Response,
  ) {
    const user = await this.userService.checkUserExists(body);
    return res.json(
      this.authService.setToken(res, {
        id: user.id,
        username: user.username,
      }),
    );
  }

  @Get('check')
  checkAuth(@Req() req: Request) {
    const token = req.headers?.cookie?.split('=')[1];

    return token
      ? {
          message: 'Authenticated',
          data: {
            token,
          },
          status: 200,
        }
      : { message: 'Not authenticated', data: null, status: 401 };
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie('token');
    return res.json({
      message: 'Logged out successfully',
      data: null,
      status: 200,
    });
  }
}
