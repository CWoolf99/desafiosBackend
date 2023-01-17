const {promises:fs} = require('fs');
const {errorLogger} = require("../../servicios/logger") 
const dtoMsjs = require("../dto/dtoMsjs")
class daoMsjsFs{
    constructor( archivo ){
        this.archivo=archivo;
    }


    async save(obj) { 
        try {
            await fs.writeFile(`${this.archivo}`, JSON.stringify(obj))
            console.log('se guardo exitosamente')
        } 
        catch (err) {

            errorLogger.error('error al guardar')
        }
    }

    async getAll () {
        try {

            const contenido = await fs.readFile(`${this.archivo}`, 'utf-8')
            //console.log(`se leyó el texto exitosamente` , JSON.parse(contenido))
            const final = [JSON.parse(contenido)]
            //console.log(final)
            if (final[0].entities === undefined){
                return 0
            } else{
            return dtoMsjs(final[0])
            }
        }
        catch (err) {
            errorLogger.error('error en la lectura')
        }
    };
}


module.exports = daoMsjsFs; 

