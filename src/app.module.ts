import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ShippingModule } from './shipping/shipping.module';

@Module({
  imports: [ProductModule, ShippingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
