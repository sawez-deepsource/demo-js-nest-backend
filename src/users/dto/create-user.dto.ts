import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator'

export class CreateUserDto {
  @IsString()
  name: string = ''

  @IsEmail()
  email: string = ''

  @MinLength(8)
  password: string = ''

  @IsOptional()
  @IsString()
  bio?: string
}
