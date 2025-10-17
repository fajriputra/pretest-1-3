import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { User } from '../../users/entity/users.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.companies, { onDelete: 'CASCADE' })
  user: User;

  @Column({ unique: true })
  company_code: string;

  @Column()
  company_name: string;
}
