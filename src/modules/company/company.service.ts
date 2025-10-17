import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entity/company.entity';
import { CreateCompanyDto } from './dto/company.dto';
import { User } from '../users/entity/users.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepo: Repository<Company>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createCompany(dto: CreateCompanyDto): Promise<Company> {
    const user = await this.userRepo.findOne({
      where: { id: dto.user_id },
    });

    if (!user) throw new NotFoundException('User not found');

    const company = this.companyRepo.create({
      user,
      company_code: dto.company_code,
      company_name: dto.company_name,
    });

    return this.companyRepo.save(company);
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepo.find({ relations: ['user'] });
  }
}
