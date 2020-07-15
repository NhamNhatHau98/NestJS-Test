import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class ShippingService {

    constructor(private readonly productService: ProductService) { }

    shipProduct(req) {
        const { id, quantity } = req
        //console.log(id, quantity);
        const productLeft = this.productService.productIssueWithID(id, quantity)
        //console.log(productLeft);
        return quantity + ' of the product is on yout way, ' + productLeft + ' left.\n'
    }
}
