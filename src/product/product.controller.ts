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

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('find')
  findAll() {
    return this.productService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.productService.findOne(id);
  }

  @Patch('update/:id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.productService.remove(id);
  }
}
