import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import { Model } from 'mongoose'
import { async } from "rxjs";
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async inserProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new this.productModel({
            title: title,
            description: desc,
            price: price
        });
        const result = await newProduct.save()

        return result.id as string;
    }

    async getProducts() {
        const products = await this.productModel.find().exec()
        //console.log(products)
        //return products as Product[] //will return an array with each object have an undersoce _id prop
        //fix
        return products.map(prod => ({
            id: prod.id,
            title: prod.title,
            description: prod.description,
            price: prod.price
        }));
        // the same as
        // const products = await this.productModel.find()
        // return [...products]
    }

    async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId);
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price
        }
    }

    async updateProduct(productId: string, title: string, desc: string, price: number) {
        // const product = this.findProduct(productId)[0];
        // const index = this.findProduct(productId)[1];
        //    |
        //    V
        //using destructoring
        //const [product, index] = this.findProduct(productId);
        const updatedProduct = await this.findProduct(productId)
        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.description = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }
        updatedProduct.save()
    }

    async deleteProduct(proId: string) {
        const result = await this.productModel.deleteOne({ _id: proId }).exec()
        if (result.deletedCount === 0) {
            throw new NotFoundException('Product not found')
        }
    }

    async findProduct(id: string): Promise<Product> {
        let product
        try {
            product = await this.productModel.findById(id).exec()
        } catch (error) {
            throw new NotFoundException('Could noy find product')
        }
        //const productIndex = this.products.indexOf()
        if (!product) {
            throw new NotFoundException('Could noy find product')
        }
        return product
    }
}