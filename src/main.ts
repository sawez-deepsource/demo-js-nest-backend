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
