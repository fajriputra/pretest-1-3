/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';

import { CheckoutService } from './checkout.service';
import { Checkout } from './entity/checkout.entity';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  async checkout(
    @Body()
    body: Pick<Checkout, 'productName' | 'originalPrice' | 'voucherUsed'>,
    @Res() res: Response,
  ) {
    try {
      const result = await this.checkoutService.checkoutVoucherUsed(body);

      return res.status(HttpStatus.OK).json({
        status: 200,
        message: 'Checkout successfully',
        data: result,
      });
    } catch (error) {
      return res.status(error.getStatus()).json(error.getResponse());
    }
  }
}
