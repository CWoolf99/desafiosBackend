const fs = require('fs');

class Contenedor{
    constructor( archivo ){
        this.archivo=archivo;
    }


   async save ( producto1 , productos ){ 
        let id = productos.length+1;
        console.log('el id es', id)
        let iD = {id:id}
        let productoF = {...iD, ...producto1} 
        productos.push(productoF);
        await guardar( this.archivo , productos )
    };

    getById(id , productos ){
        console.log(productos.find((valor)=> valor.id === id))
        return productos.find((valor)=> valor.id === id);
              
    };

    async getAll () {
        try {

            const contenido = await fs.promises.readFile(this.archivo, 'utf-8')
            console.log(`se leyó el texto exitosamente` , JSON.parse(contenido))
            return JSON.parse(contenido); 
        }
        catch (err) {
            console.log('error en la lectura')
        }
    };

   async deleteById ( id ) {
        const productosTxt = await this.getAll();
        guardar(this.archivo, productosTxt.filter(( valor )=> valor.id != id) );
    };

    deleteAll ( productos ) { 
        productos=[];
        guardar( this.archivo , productos);
    };


}

async function guardar ( archivo , producto) {
    let productoJ= JSON.stringify(producto)
    console.log(productoJ)
    try {

        await fs.promises.writeFile(archivo, `${productoJ}`)
        console.log(`se agregó el texto exitosamente`)
    }
    catch (err) {
        
    }
};

let product = new Contenedor('productos.txt')

let producto1 = {nombre:'ab',precio:2,imagen:'a'};

let producto2 = {nombre:'cd',precio:3,imagen:'b'};

let producto3 = {nombre:'ef',precio:4,imagen:'c'};

const productos=[];

let id = 1;

product.save( producto1 , productos );

setTimeout(() => {
    product.save( producto2 , productos );  
}, 3000);

setTimeout(() => {
    product.save( producto3 , productos );   
}, 5000);

setTimeout(() => {
    product.getById(id , productos);  
}, 6000);

setTimeout(() => {
    product.getAll()    
}, 7000);

setTimeout(() => {
    product.deleteById( id );   
}, 8000);

setTimeout(() => {
    product.deleteAll( productos );   
}, 9000);