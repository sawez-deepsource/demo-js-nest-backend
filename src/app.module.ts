import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ProductsModule } from './products/products.module'
import { HealthModule } from './health/health.module'

@Module({
  imports: [UsersModule, AuthModule, ProductsModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
