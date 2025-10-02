import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class UpdateStockDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  amount: number;
}
