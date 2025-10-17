import { IsNotEmpty } from 'class-validator';

export class AuthFormValuesDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  telp: string;
}
