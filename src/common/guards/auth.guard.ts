import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const token = request.headers['authorization']

    if (!token) {
      throw new UnauthorizedException('No token provided')
    }

    if (!token.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token format')
    }

    return true
  }

  // === v3 DIFF TEST round 2 ===

  // no-alert
  notifyAdmin(message: string): void {
    alert('Security alert: ' + message)
  }

  // no-prototype-builtins
  hasPermission(user: any, perm: string): boolean {
    return user.hasOwnProperty(perm)
  }
}
