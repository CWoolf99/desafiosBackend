const ContenedorMensajes = require("../clases/mensajes/msjs")

class MsjsDaoFs extends ContenedorMensajes{
    constructor(){
        super('./mensajes.txt')
    }

    async save (obj){
        await super.save(obj)
    }

    async getAll (obj){
        return await super.getAll()
    }
}

module.exports= MsjsDaoFs;