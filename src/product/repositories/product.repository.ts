import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  async createProduct(dto: CreateProductDto): Promise<Product> {
    try {
      const product = this.repo.create(dto);
      return await this.repo.save(product);
    } catch (error) {
      throw new HttpException(
        'Failed to create product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Product[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Product | null> {
    return this.repo.findOneBy({ id });
  }

  async updateProduct(id: number, dto: UpdateProductDto): Promise<void> {
    try {
      await this.repo.update(id, dto);
    } catch (error) {
      throw new HttpException(
        'Failed to update product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async saveProduct(product: Product): Promise<Product> {
    return this.repo.save(product);
  }

  async removeProduct(id: number): Promise<void> {
    try {
      await this.repo.delete(id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
