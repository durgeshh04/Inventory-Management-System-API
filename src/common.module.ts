import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './config/database/database.module';

@Module({
  imports: [DatabaseModule, ProductModule],
  controllers: [],
  providers: [],
})
export class CommonModule {}
