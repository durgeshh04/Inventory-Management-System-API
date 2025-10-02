// products/__tests__/products.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductRepository } from './repositories/product.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';

describe('ProductService (stock logic)', () => {
  let service: ProductService;
  let repo: jest.Mocked<ProductRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: {
            findOne: jest.fn(),
            saveProduct: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repo = module.get(ProductRepository);
  });

  // Increase Stock Tests

  it('should increase stock successfully', async () => {
    const product: Product = {
      id: 1,
      name: 'Test',
      description: 'desc',
      quantity: 10,
      threshold: 5,
      createdat: new Date(),
      updatedat: new Date(),
    };
    repo.findOne.mockResolvedValue(product);
    repo.saveProduct.mockResolvedValue({ ...product, quantity: 15 });

    const result: any = await service.increaseStock(1, 5);

    expect(result.data.quantity).toBe(15);
    expect(result.message).toContain('Increased stock');
  });

  it('should throw error when increase amount is not positive', async () => {
    await expect(service.increaseStock(1, 0)).rejects.toThrow(
      BadRequestException,
    );
  });

  //Decrease Stock Tests

  it('should decrease stock successfully', async () => {
    const product: Product = {
      id: 2,
      name: 'Test',
      description: 'desc',
      quantity: 10,
      threshold: 5,
      createdat: new Date(),
      updatedat: new Date(),
    };
    repo.findOne.mockResolvedValue(product);
    repo.saveProduct.mockResolvedValue({ ...product, quantity: 5 });

    const result: any = await service.decreaseStock(2, 5);

    expect(result.data.quantity).toBe(5);
    expect(result.message).toContain('Decreased stock');
  });

  it('should throw error when decreasing more than available', async () => {
    const product: Product = {
      id: 3,
      name: 'Test',
      description: 'desc',
      quantity: 3,
      threshold: 5,
      createdat: new Date(),
      updatedat: new Date(),
    };
    repo.findOne.mockResolvedValue(product);

    await expect(service.decreaseStock(3, 5)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw NotFoundException if product does not exist', async () => {
    repo.findOne.mockResolvedValue(null);

    await expect(service.decreaseStock(999, 5)).rejects.toThrow(
      NotFoundException,
    );
  });
});
