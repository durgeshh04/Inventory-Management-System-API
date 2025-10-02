import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('low-stock')
  findLowStock() {
    return this.productService.findLowStock();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return this.productService.update(id, dto);
  }

  @Patch(':id/increase')
  increaseStock(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStockDto,
  ) {
    return this.productService.increaseStock(id, dto.amount);
  }

  @Patch(':id/decrease')
  decreaseStock(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStockDto,
  ) {
    return this.productService.decreaseStock(id, dto.amount);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
