const knex = require('knex');

class ContenedorMensajes{
    constructor( options ){
        this.knex=knex ( options );
    }


crearTabla() {
    return this.knex.schema.hasTable('mensajes').then((exists) => {
      if (!exists) {
        return this.knex.schema.createTable("mensajes", (table) => {
          table.string("usuario", 50).notNullable();
          table.float("texto").notNullable();
          table.string("fyh").notNullable();
        })
      }
    });
  };

save(obj) {
            return this.knex("mensajes").insert(obj) 
    };
    

getAll () {
    return this.knex("mensajes").select("*")
};
}


module.exports = ContenedorMensajes; 

