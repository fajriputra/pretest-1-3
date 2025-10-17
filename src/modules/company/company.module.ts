import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entity/company.entity';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { User } from '../users/entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, User])],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
