const fs = require('fs');

class Contenedor{
    constructor( archivo ){
        this.archivo=archivo;
    }


    save ( producto1 , productos ){ 
        let id = productos.length+1;
        console.log('el id es', id)
        let iD = {id:id}
        let productoF = {...iD, ...producto1} 
        productos.push(productoF);
        guardar( this.archivo , productos )
    };

    getById(id , productos ){
        return productos.find((valor)=> valor.id === id);
              
    };

    getAll ( productos ) {
        console.log( productos );
    };

    deleteById ( id , productos ) {
        productos = productos.filter(( valor )=> valor.id != id)
        console.log(productos);
        guardar( this.archivo , productos);
    };

    deleteAll ( productos ) { 
        productos=[];
        console.log(productos);
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


/*async function leer ( archivo ) {
    try {

        const contenido = await fs.promises.readFile(archivo, 'utf-8')
        console.log(`se leyó el texto exitosamente`)
        let productos = contenido;
        let productosL = JSON.parse(productos)
        return productosL 

    }
    catch (err) {
        
    }
};
*/

let product = new Contenedor('productos.txt')

let producto1 = {nombre:'ab',precio:2,imagen:'a'};

let producto2 = {nombre:'cd',precio:3,imagen:'b'};

let producto3 = {nombre:'ef',precio:4,imagen:'c'};

const productos=[];

let id = 1;

product.save( producto1 , productos );

product.save( producto2 , productos );

product.save( producto3 , productos );

product.getById(id , productos);

product.getAll(productos);

//product.deleteById( id , productos );

//product.deleteAll( productos );