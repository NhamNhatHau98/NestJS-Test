import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model'

@Injectable()
export class ProductService {

    private products: Product[] = [
        { id: '1', name: 'Product #1', description: 'Desc for product 1', price: 20.99, quantity: 100 },
        { id: '2', name: 'Product #2', description: 'Desc for product 2', price: 14.99, quantity: 20 },
        { id: '3', name: 'Product #3', description: 'Desc for product 3', price: 10.99, quantity: 80 },
    ]

    getHome() {
        return 'Welcome to product home page\n'
    }

    getAllProducts() {
        return this.products
    }

    getSingleProduct(id) {
        //console.log(id);
        const foundProduct = this.findProduct(id)
        if (!foundProduct) {
            return new NotFoundException('Product not found')
        }
        return { ...foundProduct };
    }

    addProduct(prodId, prodName, prodDesc, prodPrice, prodQuantity) {
        const newProduct = new Product(prodId, prodName, prodDesc, prodPrice, prodQuantity)
        this.products.push(newProduct)
    }

    updateProduct(prodId, prodName, prodDesc, prodPrice, prodQuantity) {
        const [foundProduct, index] = this.findProduct(prodId)
        const updatedProduct = { ...foundProduct }
        if (prodId) {
            updatedProduct.id = prodId
        }
        if (prodName) {
            updatedProduct.name = prodName
        }
        if (prodPrice) {
            updatedProduct.price = prodPrice
        }
        if (prodDesc) {
            updatedProduct.description = prodDesc
        }
        if (prodQuantity) {
            updatedProduct.quantity = prodQuantity
        }
        this.products[index] = { ...updatedProduct }
    }

    deleteProduct(prodId) {
        const index = this.findProduct(prodId)[1]
        this.products.splice(index, 1)

    }

    //xuat kho
    productIssueWithID(id: string, quantity: number) {
        const foundProduct = this.products.find(prod => prod.id === id)
        foundProduct.quantity -= quantity
        return foundProduct.quantity
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex(prod => prod.id === id)
        const foundProduct = this.products[productIndex]
        if (!foundProduct) {
            throw new NotFoundException('Product not found')
        }
        return [foundProduct, productIndex]
    }
}
