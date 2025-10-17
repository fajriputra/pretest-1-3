import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Checkout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column('decimal', { precision: 10, scale: 2 })
  originalPrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  discountedPrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  voucherUsed: number;

  @Column('decimal', { precision: 10, scale: 2 })
  pointsEarned: number;
}
