import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { get } from 'http';

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @Get('')
    getHomePage() {
        return this.productService.getHome()
    }

    @Get('/all')
    getAllProducts() {
        return this.productService.getAllProducts()
    }

    @Get(':id')
    getSingleProduct(@Param('id') param: string) {
        console.log(param);
        return this.productService.getSingleProduct(param)
    }

    @Post('/create')
    addProduct(
        @Body('id') id: string,
        @Body('name') name: string,
        @Body('description') desc: string,
        @Body('price') price: number,
        @Body('quantity') quantity: number
    ): any {
        return this.productService.addProduct(id, name, desc, price, quantity)
    }

    @Post('/update')
    updateProduct(
        @Body('id') id: string,
        @Body('name') name: string,
        @Body('description') desc: string,
        @Body('price') price: number,
        @Body('quantity') quantity: number
    ): any {
        return this.productService.updateProduct(id, name, desc, price, quantity)

    }

    @Post('/delete')
    deleteProduct(@Body('id') id: string) {
        return this.productService.deleteProduct(id)
    }


}
