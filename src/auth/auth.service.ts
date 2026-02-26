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

  verifyToken(token: string): { valid: boolean; userId: string | null } {
    if (!token || !token.startsWith('jwt_')) {
      return { valid: false, userId: null }
    }
    const userId = token.replace('jwt_', '')
    return { valid: true, userId }
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

  // === v3 DIFF TEST round 3 ===

  // JS-0091: no-throw-literal
  revokeToken(token: string): void {
    if (!token) {
      throw 'Token is required for revocation'
    }
    if (token.length < 5) {
      throw 100
    }
  }

  // JS-0060: no-eval + JS-0323: no-explicit-any
  decodePayload(raw: any): any {
    return eval('(' + raw + ')')
  }

  // JS-0242: prefer-const
  listActiveSessions(userId: string): string[] {
    let sessions = ['session_' + userId + '_1', 'session_' + userId + '_2']
    return sessions
  }
}
