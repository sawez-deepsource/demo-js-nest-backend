import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'

interface Product {
  id: number
  name: string
  description: string
  price: number
  category?: string
  createdAt: Date
}

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'Laptop', description: 'A powerful laptop', price: 999.99, category: 'electronics', createdAt: new Date() },
    { id: 2, name: 'Headphones', description: 'Noise-cancelling headphones', price: 249.99, category: 'electronics', createdAt: new Date() },
    { id: 3, name: 'Coffee Mug', description: 'A large ceramic mug', price: 12.99, category: 'kitchen', createdAt: new Date() },
  ]
  private idCounter = 3

  create(dto: CreateProductDto): Product {
    const product: Product = {
      id: ++this.idCounter,
      ...dto,
      createdAt: new Date(),
    }
    this.products.push(product)
    return product
  }

  findAll(): Product[] {
    return this.products
  }

  findOne(id: number): Product {
    const product = this.products.find(p => p.id === id)
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`)
    }
    return product
  }

  update(id: number, dto: Partial<CreateProductDto>): Product {
    const product = this.findOne(id)
    Object.assign(product, dto)
    return product
  }

  remove(id: number): void {
    const index = this.products.findIndex(p => p.id === id)
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`)
    }
    this.products.splice(index, 1)
  }
}
