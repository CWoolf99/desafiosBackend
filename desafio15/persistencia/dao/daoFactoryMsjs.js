const daoMsjsMongo = require("./daoMsjsMongo");
const daoMsjsFbs = require("./daoMsjsFbs");
const daoMsjsFs = require("./daoMsjsFs");
const parseArgs = require("minimist");
const args = parseArgs(process.argv.slice(2)) 

const opcion = args._[2] || 'Fs'

//Nombre del archivo para almacenar con filesystem
const archivo = './mensajes.txt';

//Nombre de la colección y el esquema a utilizar en mongo Atlas
const schema = {
    entities: { type:{} , required:true},
    result:{type:{}, required:true}
}
const collectionMongo = 'mensajesDesafios'

//Nombre de la colección en firebase
const collectionFbs = 'mensajesDesafio'

let dao
switch (opcion) {
    case 'Mongo':
        dao = new daoMsjsMongo( collectionMongo , schema )
        break
    case 'Fbs':
        dao = new daoMsjsFbs( collectionFbs )
        break
    default:
        dao = new daoMsjsFs( archivo ) 
}

class daoMsjsFactory {
    static getDao() {
        return dao
    }
}

module.exports = daoMsjsFactory