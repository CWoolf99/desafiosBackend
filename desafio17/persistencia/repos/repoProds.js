const apiProductos = require("../apiProductos");
const { options } = require("../../options/mariaDB");

class repoProds{
    constructor(){
        this.api = new apiProductos(options)
    }
    async crearTabla (){
        await this.api.crearTabla();
    }

    async  guardar (prods){
        return await this.api.guardar(prods)
    }

    async listaproductos (){
        const final = await this.api.listaproductos()
        return final
    }

    async actualizaproducto (id , producto){
        const final = await this.api.actualizaproducto(id,producto)
        return final
    }
    async eliminaproducto (id) {
        const final = await this.api.eliminaproducto(id)
        return final
    }
}

module.exports= repoProds;