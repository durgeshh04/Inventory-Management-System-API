import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiResponse } from './interfaces/response.interface';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}

  async create(dto: CreateProductDto): Promise<ApiResponse<Product>> {
    if (dto.quantity < 0)
      throw new BadRequestException('Quantity cannot be negative');
    const product = await this.productRepo.createProduct(dto);
    return {
      success: true,
      status: 201,
      message: 'Product created successfully',
      data: product,
      timestamp: new Date(),
    };
  }

  async findAll(): Promise<ApiResponse<Product[]>> {
    const products = await this.productRepo.findAll();
    return {
      success: true,
      status: 200,
      message: 'Fetched all products',
      data: products,
      timestamp: new Date(),
    };
  }

  async findOne(id: number): Promise<ApiResponse<Product>> {
    const product = await this.productRepo.findOne(id);
    if (!product) throw new NotFoundException('Product not found');
    return {
      success: true,
      status: 200,
      message: 'Fetched product',
      data: product,
      timestamp: new Date(),
    };
  }

  async update(id: number, dto: UpdateProductDto): Promise<ApiResponse<null>> {
    const product = await this.productRepo.findOne(id);
    if (!product) throw new NotFoundException('Product not found');
    await this.productRepo.updateProduct(id, dto);
    return {
      success: true,
      status: 200,
      message: 'Product updated successfully',
      timestamp: new Date(),
    };
  }

  async remove(id: number): Promise<ApiResponse<null>> {
    const product = await this.productRepo.findOne(id);
    if (!product) throw new NotFoundException('Product not found');
    await this.productRepo.removeProduct(id);
    return {
      success: true,
      status: 200,
      message: 'Product removed successfully',
      timestamp: new Date(),
    };
  }

  async increaseStock(
    id: number,
    amount: number,
  ): Promise<ApiResponse<Product>> {
    if (amount <= 0)
      throw new BadRequestException('Increase amount must be positive');
    const product = await this.productRepo.findOne(id);
    if (!product) throw new NotFoundException('Product not found');
    product.quantity += amount;
    const updated = await this.productRepo.saveProduct(product);

    return {
      success: true,
      status: 200,
      message: `Increased stock by ${amount}`,
      data: updated,
      timestamp: new Date(),
    };
  }

  async decreaseStock(
    id: number,
    amount: number,
  ): Promise<ApiResponse<Product>> {
    if (amount <= 0)
      throw new BadRequestException('Decrease amount must be positive');
    const product = await this.productRepo.findOne(id);
    if (!product) throw new NotFoundException('Product not found');

    if (product.quantity < amount) {
      throw new BadRequestException('Not enough stock available');
    }

    product.quantity -= amount;
    const updated = await this.productRepo.saveProduct(product);

    return {
      success: true,
      status: 200,
      message: `Decreased stock by ${amount}`,
      data: updated,
      timestamp: new Date(),
    };
  }

  async findLowStock(): Promise<ApiResponse<Product[]>> {
    const products = await this.productRepo.findAll();
    const lowStock = products.filter((p) => p.quantity < p.threshold);

    return {
      success: true,
      status: 200,
      message: 'Fetched low stock products',
      data: lowStock,
      timestamp: new Date(),
    };
  }
}
