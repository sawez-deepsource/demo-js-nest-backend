import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  app.enableCors()

  // Intentional issues
  var port = process.env.PORT || 3000  // no-var
  console.log(`Starting on port ${port}`)  // no-console
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)

  await app.listen(port)
}

bootstrap()  // floating promise

// === v3 DIFF TEST round 5 ===

// no-eval, no-alert, eqeqeq, no-var
function unsafeStartup(config: any) {
  var mode = config.mode
  if (mode == 'debug') {
    eval('console.log("debug mode")')
  }
  var retries = 3
  return retries
}

// prefer-const, no-prototype-builtins, prefer-template
function checkEnv(env: Record<string, string>) {
  let name = 'production'
  let valid = env.hasOwnProperty('DATABASE_URL')
  let msg = 'Environment ' + name + ' is ' + (valid ? 'ready' : 'not ready')
  console.log(msg)
  return valid
}
