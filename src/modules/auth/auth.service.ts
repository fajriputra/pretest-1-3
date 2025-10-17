/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';

import { User } from '../users/entity/users.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(user: Pick<User, 'id' | 'username'>) {
    return this.jwtService.sign(user);
  }

  setToken(res: Response, user: Pick<User, 'id' | 'username'>) {
    const token = this.generateToken(user);

    const decodedToken = this.jwtService.decode(token) as {
      iat: number;
      exp: number;
    };

    res.cookie('token', token, { httpOnly: true, secure: false });

    return {
      message: 'Logged in successfully',
      data: {
        token,
        session_exp: decodedToken.exp,
        session_iat: decodedToken.iat,
      },
      status: 200,
    };
  }
}
