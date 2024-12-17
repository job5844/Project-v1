import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../User/product/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['category']
    });
  }

  async create(product: Partial<Product>): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  async findOne(id: string): Promise<Product> {
    return this.productRepository.findOne({
      where: { proId: id },
      relations: ['category']
    });
  }

  async update(id: string, product: Partial<Product>): Promise<Product> {
    await this.productRepository.update(id, product);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}