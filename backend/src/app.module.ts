import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { User } from './User/user.entity';
import { Role } from './User/role.entity';
import { Product } from './User/product/product.entity';
import { Category } from './User/product/category.entity';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // เปลี่ยนจาก 'db' เป็น 'localhost'
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'auth_db',
      entities: [User, Role, Product, Category ],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    CategoriesModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}