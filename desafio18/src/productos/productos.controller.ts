import { Controller , Get , Post , Body , Put , Delete , Param } from '@nestjs/common';
import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController  {
    constructor(private readonly productosService: ProductosService) {}
  
    @Get()
    async getAllUsers() {
        return await this.productosService.findAll();
    };

    @Post()
    async createProduct(
        @Body('nombre') nombre:string,
        @Body('precio') precio:number,
        @Body('imagen') imagen:string) {
        return await this.productosService.createProduct({nombre:nombre,precio:precio,imagen:imagen})
    };

    @Put()
    async updateProduct(
        @Body('nombre') nombre:string,
        @Body('precio') precio:number,
        @Body('imagen') imagen:string,
        @Body('id') id:number) {
            return await this.productosService.updateProduct(id,{nombre:nombre,precio:precio,imagen:imagen})
    };

    @Delete('/:id')
    async deleteProduct(@Param('id') id:number){
        return await this.productosService.deleteProducto(id)
    };
  }
