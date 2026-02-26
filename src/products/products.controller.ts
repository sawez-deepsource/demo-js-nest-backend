import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto)
  }

  @Get()
  findAll() {
    return this.productsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateProductDto>) {
    return this.productsService.update(+id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.productsService.remove(+id)
    return { deleted: true }
  }

  // === v3 DIFF TEST round 3 ===

  // JS-0050: eqeqeq
  @Get('check/:id')
  checkExists(@Param('id') id: string) {
    const product = this.productsService.findAll().find(p => p.id == +id)
    return { exists: product != null }
  }

  // JS-0002: no-console + JS-0239: no-var
  @Get('debug/:id')
  debugProduct(@Param('id') id: string) {
    var product = this.productsService.findOne(+id)
    console.log('Debug product:', product)
    debugger
    return product
  }
}
