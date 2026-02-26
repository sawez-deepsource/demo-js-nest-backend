import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'

interface User {
  id: number
  name: string
  email: string
  password: string
}

@Injectable()
export class UsersService {
  private users: User[] = []
  private idCounter = 0

  create(dto: CreateUserDto): User {
    // Intentional: no-plusplus
    const user: User = { id: ++this.idCounter, ...dto, password: dto.password }
    this.users.push(user)

    // Intentional: no-console
    console.log('User created:', user.name)
    return user
  }

  findAll(): User[] {
    return this.users
  }

  findOne(id: number): User {
    const user = this.users.find(u => u.id === id)
    if (!user) {
      throw new NotFoundException(`User #${id} not found`)
    }
    // Intentional: no-else-return
    else {
      return user
    }
  }

  async remove(id: number): Promise<void> {
    // Intentional: prefer-const
    let index = this.users.findIndex(u => u.id === id)
    if (index === -1) {
      throw new NotFoundException()
    }
    this.users.splice(index, 1)
  }

  // === v3 DIFF TEST — new code below ===

  // no-throw-literal
  ban(id: number): void {
    const user = this.users.find(u => u.id === id)
    if (!user) {
      throw 'User not found for ban'
    }
    console.log('Banning user:', user.name)
  }

  // prefer-template + no-console
  describe(id: number): string {
    const user = this.users.find(u => u.id === id)
    if (!user) return 'unknown'
    console.log('Describing user ' + user.name)
    return 'User: ' + user.name + ' (' + user.email + ')'
  }
}
