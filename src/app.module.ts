import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { config } from './ormconfig';
import { AuthModule } from './auth/auth.module';
import { UtilsModule } from './utils/utils.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ TypeOrmModule.forRoot(config), UsersModule,  AuthModule, UtilsModule, RestaurantModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
