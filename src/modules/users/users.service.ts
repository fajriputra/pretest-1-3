/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { User } from './entity/users.entity';
import { AuthFormValuesDto } from '../auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findByUsername(username: string) {
    return this.userRepo.findOne({ where: { username } });
  }

  async createUser(payload: AuthFormValuesDto) {
    const existingUser = await this.findByUsername(payload.username);

    if (existingUser) throw new ConflictException('Username already exists');

    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const user = this.userRepo.create({
      ...payload,
      password: hashedPassword,
    });

    return this.userRepo.save(user);
  }

  async checkUserExists(payload: Pick<User, 'username' | 'password'>) {
    const user = await this.findByUsername(payload.username);
    if (!user) throw new NotFoundException('User not found');

    const isMatch = await bcrypt.compare(payload.password, user.password);
    if (!isMatch) throw new NotFoundException('Invalid credentials');

    return user;
  }

  async getUsers() {
    const users = await this.userRepo.find({
      relations: ['companies'],
    });

    return users
      .map((user) => {
        return user.companies.length > 0
          ? user.companies.map((company) => ({
              user_id: user.id,
              company_id: company.id,
              nama: user.username,
              email: user.email ?? null,
              telp: user.telp,
              company_code: company.company_code,
              company_name: company.company_name ?? null,
            }))
          : [
              {
                user_id: user.id,
                company_id: null,
                nama: user.username,
                email: user.email ?? null,
                telp: user.telp,
                company_code: null,
                company_name: null,
              },
            ];
      })
      .flat();
  }
}
