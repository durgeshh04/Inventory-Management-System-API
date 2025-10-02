import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'inventory', name: 'product_tbl' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'int' })
  productId: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'bigint' })
  quantity: number;

  @Column({ type: 'int' })
  threshold: number;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;
}
