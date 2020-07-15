import { Controller, Post, Body, Get } from '@nestjs/common';
import { ShippingService } from './shipping.service';

@Controller('shipping')
export class ShippingController {

    constructor(private readonly shippingService: ShippingService) { }

    @Get('')
    getHome() {
        return 'Welcome to shipping home page\n'
    }

    @Post('product')
    shipProduct(@Body() req) {
        console.log(req);
        return this.shippingService.shipProduct(req)
    }

}


