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
}
