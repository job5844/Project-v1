import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity('categories')
export class Category {
  @PrimaryColumn({ name: 'category_id', type: 'char', length: 10 })
  categoryId: string;

  @Column({ name: 'category_name', type: 'varchar', length: 50 })
  categoryName: string;

  @OneToMany(() => Product, (product) => product.category)
  products?: Product[];
}