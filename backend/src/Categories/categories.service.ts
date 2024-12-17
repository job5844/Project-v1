import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../User/product/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async create(category: Partial<Category>): Promise<Category> {
    const newCategory = this.categoryRepository.create(category);
    return this.categoryRepository.save(newCategory);
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryRepository.findOne({ where: { categoryId: id } });
  }

  async update(id: string, category: Partial<Category>): Promise<Category> {
    await this.categoryRepository.update(id, category);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}