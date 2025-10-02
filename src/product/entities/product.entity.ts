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
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'int', default: 5 })
  threshold: number;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;
}
