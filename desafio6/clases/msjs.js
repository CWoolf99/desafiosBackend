const {promises:fs} = require('fs');

class ContenedorMensajes{
    constructor( archivo ){
        this.archivo=archivo;
    }


    async save(obj) {
        const mensajes = await this.getAll(); 
        mensajes.push(obj) 
        console.log(mensajes)
        try {
            await fs.writeFile(`${this.archivo}`, JSON.stringify(mensajes))
            console.log('se guardo exitosamente')
        } 
        catch (err) {
            console.log('error al guardar')
        }
    }

    async getAll () {
        console.log(this.archivo)
        try {

            const contenido = await fs.readFile(`${this.archivo}`, 'utf-8')
            console.log(`se leyó el texto exitosamente` , JSON.parse(contenido))
            return JSON.parse(contenido); 
        }
        catch (err) {
            console.log('error en la lectura')
        }
    };
}


module.exports = ContenedorMensajes; 

