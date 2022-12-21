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
        await this.api.guardar(prods)
    }

    async listaproductos (){
        const final = await this.api.listaproductos()
        return final
    }
}

module.exports= repoProds;