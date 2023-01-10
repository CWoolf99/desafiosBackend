const knex = require('knex');
class apiProductos {
    constructor(options) {
        this.knex = knex(options);
    }
    crearTabla() {
        return this.knex.schema.hasTable('productos').then((exists) => {
          if (!exists) {
            return this.knex.schema.createTable("productos", (table) => {
              table.string("nombre", 50).notNullable();
              table.float("precio").notNullable();
              table.string("imagen").notNullable();
              table.increments("id").primary();
            })
          }
        });
    
      };

    guardar(producto) {
        const productos = this.listaproductos();
        const id = productos.length;
        const nuevoproducto = {...producto, id: id}
        return this.knex("productos").insert(nuevoproducto)
    }

    listaproductos() {
        return this.knex("productos").select("*")
    }

    actualizaproducto(id, producto) {
        return this.knex("productos").where("id",id).update({nombre:producto.nombre , precio:producto.precio , imagen:producto.imagen})
    }

    eliminaproducto(id) {
        console.log({id:id})
        return this.knex("productos").where("id","=",id).del()
    }
}
module.exports = apiProductos;