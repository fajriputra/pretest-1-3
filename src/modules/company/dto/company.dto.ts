import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCompanyDto {
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  company_code: string;

  @IsNotEmpty()
  company_name: string;
}
