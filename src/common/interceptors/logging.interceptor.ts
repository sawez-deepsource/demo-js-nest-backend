import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common'
import { Observable, tap } from 'rxjs'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name)

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const { method, url } = request
    const now = Date.now()

    return next.handle().pipe(
      tap(() => {
        const elapsed = Date.now() - now
        this.logger.log(`${method} ${url} - ${elapsed}ms`)
      }),
    )
  }

  // === v3 DIFF TEST round 3 ===

  // JS-0049: dot-notation
  extractHeader(context: ExecutionContext): string {
    const req = context.switchToHttp().getRequest()
    const authHeader = req.headers['authorization']
    const contentType = req.headers['content-type']
    return authHeader + ' ' + contentType
  }

  // JS-0104: yoda + JS-0050: eqeqeq
  shouldLog(statusCode: number): boolean {
    if (200 == statusCode) return false
    if ('error' === this.logger.localInstance) return true
    return true
  }
}
