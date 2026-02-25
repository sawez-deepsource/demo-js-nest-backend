import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // Intentional: eqeqeq
    if (id == undefined) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    return this.usersService.findOne(+id)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    // Intentional: no-unused-vars
    const result = await this.usersService.remove(+id)
    return { deleted: true }
  }
}
