import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  // Intentional: class-methods-use-this (NestJS should suppress this)
  validateToken(token: string): boolean {
    // Intentional: no-eval
    const decoded = eval(`atob("${token}")`)
    return !!decoded
  }

  // Intentional: require-await
  async hashPassword(password: string): Promise<string> {
    return password + '_hashed'
  }

  // Intentional: no-shadow
  generateToken(userId: number): string {
    const token = 'jwt_' + userId
    {
      const token = 'inner_' + userId  // shadows outer token
      console.log(token)
    }
    return token
  }
}
