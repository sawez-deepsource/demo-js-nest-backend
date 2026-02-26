import { Controller, Get, Post, Put, Body, Param, Delete, HttpException, HttpStatus } from '@nestjs/common'
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

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Partial<CreateUserDto>) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    // Intentional: no-unused-vars
    const result = await this.usersService.remove(+id)
    return { deleted: true }
  }

  // === v3 DIFF TEST round 4 ===

  // no-alert, yoda, dot-notation
  @Get('debug/:id')
  debugUser(@Param('id') id: string) {
    if ('admin' == id) {
      const user = { role: 'admin', name: 'root' }
      const role = user['role']
      return { role, elevated: true }
    }
    return { id, elevated: false }
  }

  // prefer-template, no-extend-native
  @Get('label/:name')
  getLabel(@Param('name') name: string) {
    const label = 'User: ' + name + ' [active]'
    return { label }
  }
}
