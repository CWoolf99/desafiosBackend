const {promises:fs} = require('fs');

class ContenedorMensajes{
    constructor( archivo ){
        this.archivo=archivo;
    }


    async save(obj) { 
        try {
            await fs.writeFile(`${this.archivo}`, JSON.stringify(obj))
            console.log('se guardo exitosamente')
        } 
        catch (err) {
            console.log('error al guardar')
        }
    }

    async getAll () {
        try {

            const contenido = await fs.readFile(`${this.archivo}`, 'utf-8')
            //console.log(`se leyó el texto exitosamente` , JSON.parse(contenido))
            return JSON.parse(contenido); 
        }
        catch (err) {
            console.log('error en la lectura')
        }
    };
}


module.exports = ContenedorMensajes; 

