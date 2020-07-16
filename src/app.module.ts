import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot('mongodb+srv://TestUser:0787875945@cluster0.ztwld.mongodb.net/<nestjs-test>?retryWrites=true&w=majority')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
