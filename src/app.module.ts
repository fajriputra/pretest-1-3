import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/users.module';
import { CompanyModule } from './modules/company/company.module';
import { CheckoutModule } from './modules/checkout/checkout.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'dbpretestpsi',
      autoLoadEntities: true,
      synchronize: false,
    }),
    AuthModule,
    UserModule,
    CompanyModule,
    CheckoutModule,
  ],
})
export class AppModule {}
