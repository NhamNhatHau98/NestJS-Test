import { Module } from "@nestjs/common";
import { ProductsService } from "./ProductService";
import { ProductsController } from "./products.controller";
import { MongooseModule } from '@nestjs/mongoose'
import { ProductSchema } from "./product.model";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }])
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
})

export class ProductsModule { }