/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Body, Get } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/company.dto';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    const company = await this.companyService.createCompany(createCompanyDto);

    const {
      user: { password, ...rest },
    } = company;

    return {
      message: 'Company created successfully',
      data: {
        ...company,
        user: rest,
      },
      status: 201,
    };
  }

  @Get()
  async getAllCompanies() {
    const companies = await this.companyService.findAll();

    const allCompanies = companies.map(({ user, ...company }) => ({
      user: {
        id: user?.id,
        username: user?.username,
        email: user?.email,
        telp: user?.telp,
      },
      ...company,
    }));

    return {
      message: 'Companies fetched successfully',
      data: allCompanies,
      status: 200,
    };
  }
}
