/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get } from '@nestjs/common';

import { UserService } from '../users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    const users = await this.userService.getUsers();

    return {
      message: 'Users fetched successfully',
      data: users,
      status: 200,
    };
  }
}
