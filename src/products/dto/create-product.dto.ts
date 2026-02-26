import { IsString, IsNumber, IsOptional, Min } from 'class-validator'

export class CreateProductDto {
  @IsString()
  name: string = ''

  @IsString()
  description: string = ''

  @IsNumber()
  @Min(0)
  price: number = 0

  @IsOptional()
  @IsString()
  category?: string
}
