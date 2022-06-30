const express = require('express');
const fs = require('fs');
const { get } = require('http');

const app = express();

const port = 8080;

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
            let productosD = JSON.parse(contenido);
            let id =Math.floor( Math.random() * (3 - 1) + 1);
            console.log(id)
            let productoR = productosD.find((valor)=> valor.id === id);
            console.log(`se leyó el texto exitosamente` , productosD , productoR )
             app.get('/', ( req , res ) => {
                res.send('desafio 3')
            })
            
            app.get('/productos', ( req , res ) => {
                res.send(productosD);
            });
            
            app.get('/productoRandom', ( req , res ) => {
                res.send(productoR)
            });
            
            app.listen(port, () => {
                console.log(`tu servidor está corriendo en el puerto ${port}`)
            });
            
            app.on('error' , (error) => {
                console.log(`Error: ${error}`);
            });
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

    async displayProductos ( ) {
       const  productosTxt = await this.getAll();
       app.get('/', ( req , res ) => {
            res.send('desafio 3')
        })
        
        app.get('/productos', ( req , res ) => {
            res.send(`${productosTxt}`);
        });
        
        app.get('/productoRandom', ( req , res ) => {
            res.send('producto random')
        });
        
        app.listen(port, () => {
            console.log(`tu servidor está corriendo en el puerto ${port}`)
        });
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

product.save( producto1 , productos );

setTimeout(() => {
    product.save( producto2 , productos );  
}, 1000);

setTimeout(() => {
    product.save( producto3 , productos );   
}, 2000);

setTimeout(() => {
    product.getAll();    
}, 3000);



