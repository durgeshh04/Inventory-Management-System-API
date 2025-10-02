import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database/database.module';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // DatabaseModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class CommonModule {}
