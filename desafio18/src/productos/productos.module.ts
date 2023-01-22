import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';

@Module({
  imports: [
    KnexModule.forRootAsync({
      useFactory: () => ({
        config: {
          client: 'mysql',
          version: '5.7',
          connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'desafiosBackend',
          },
        },
      }),
    }),
  ],
  controllers: [ProductosController],
  providers: [ProductosService]
})
export class ProductosModule {}
