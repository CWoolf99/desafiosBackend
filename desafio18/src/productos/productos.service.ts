import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

@Injectable()
export class ProductosService {
    constructor(@InjectConnection() private readonly knex: Knex) {}
  
    async findAll() {
        return await this.knex("productos").select("*")
    };

    async createProduct(producto) {
        console.log(producto)
        const productos = await this.findAll();
        const id = productos.length;
        const nuevoproducto = {...producto, id: id}
        await this.knex("productos").insert(nuevoproducto)
        return nuevoproducto;
    };

    async updateProduct(id,producto){
        await this.knex("productos").where("id",id).update({nombre:producto.nombre , precio:producto.precio , imagen:producto.imagen})
        return {id , ...producto}
    };

    async deleteProducto(id){
        const productoEliminado = await this.knex("productos").where("id","=",id).select("*")
        await this.knex("productos").where("id","=",id).del()
        return productoEliminado;
    };
  }
