import { Module } from '@nestjs/common';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';
import { ProductService } from 'src/product/product.service';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [ProductModule],
  controllers: [ShippingController],
  providers: [ShippingService]
})
export class ShippingModule { }
