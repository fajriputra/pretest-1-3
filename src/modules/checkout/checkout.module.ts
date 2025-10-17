import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Checkout } from './entity/checkout.entity';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Checkout])],
  providers: [CheckoutService],
  controllers: [CheckoutController],
})
export class CheckoutModule {}
