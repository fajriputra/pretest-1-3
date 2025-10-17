/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Checkout } from './entity/checkout.entity';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectRepository(Checkout)
    private checkoutRepo: Repository<Checkout>,
  ) {}

  async checkoutVoucherUsed(
    payload: Pick<Checkout, 'productName' | 'originalPrice' | 'voucherUsed'>,
  ): Promise<Checkout> {
    if (
      !payload.productName ||
      payload.originalPrice == null ||
      payload.voucherUsed == null
    ) {
      throw new HttpException(
        { status: 400, message: 'All Field must be filled' },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (payload.originalPrice <= 0) {
      throw new HttpException(
        { status: 400, message: 'Price is not valid format' },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (payload.voucherUsed < 0 || payload.voucherUsed > 50) {
      throw new HttpException(
        {
          status: 400,
          message: 'Voucher percentage cannot be more than 50%',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const voucherAmount = (payload.originalPrice * payload.voucherUsed) / 100;

      const discountedPrice = payload.originalPrice - voucherAmount;

      const pointsEarned = voucherAmount * 0.02;

      const checkout = this.checkoutRepo.create({
        ...payload,
        discountedPrice,
        pointsEarned,
      });

      const savedCheckout = await this.checkoutRepo.save(checkout);
      return savedCheckout;
    } catch (error) {
      throw new HttpException(
        {
          status: 500,
          message: 'Internal Server Error',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
