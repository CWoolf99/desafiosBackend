const mongoose = require('mongoose');
const {errorLogger} = require("../../servicios/logger")
const dtoMsjs = require("../dto/dtoMsjs")

async function connect(){ 
    await mongoose.connect('mongodb://localhost:27017/desafios',{serverSelectionTimeoutMS: 5000,})
    return console.log("mongo conectado")};

//connect();


class daoMsjsMongo {
    constructor(collection , schema){
        this.collection=mongoose.model(collection,schema)
    }
    async save (obj){
        try {
            await this.collection.deleteOne({})
            await this.collection.create(obj)
        } 
        catch (err) {
            errorLogger.error('error al guardar en mongo')
            return undefined
        }
    }

    async getAll (){
        try {
            let contenido = await this.collection.find({},{_id:0,__v:0})
            const final = [...contenido]
            if (final.length === 0){
                    return 0
                } else{
                return dtoMsjs(final[0])
                } 
        }
        catch (err) {
            errorLogger.error('error en la lectura')
        }
    }
}

module.exports= daoMsjsMongo;