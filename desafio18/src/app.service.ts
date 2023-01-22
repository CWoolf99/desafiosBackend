import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Desafío CRUD en NestJS, probar peticiones GET,POST,PUT y DELETE en Postman';
  }
}
