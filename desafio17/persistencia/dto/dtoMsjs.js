class dtoMensajes{
    constructor(datos){
        this.entities = datos.entities,
        this.result = datos.result 
    }
}

function dtoMsjs(datos) {
    const mensaje = new dtoMensajes(datos)
    return mensaje
}

module.exports = dtoMsjs;