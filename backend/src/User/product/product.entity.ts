import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity('products')
export class Product {
  @PrimaryColumn({ name: 'pro_id', type: 'char', length: 20 })
  proId: string;

  @Column({ name: 'pro_name', type: 'varchar', length: 255 })
  proName: string;

  @Column({ name: 'pro_cost', type: 'int' })
  proCost: number;

  @Column({ name: 'pro_price', type: 'int' })
  proPrice: number;

  @Column({ name: 'pro_stock', type: 'int' })
  proStock: number;

  @Column({ name: 'category_id', type: 'char', length: 10 })
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category?: Category;
}