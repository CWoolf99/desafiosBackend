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
        await this.guardar( this.archivo , productos )
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
        this.guardar(this.archivo, productosTxt.filter(( valor )=> valor.id != id) );
    };

    deleteAll ( productos ) { 
        productos=[];
        this.guardar( this.archivo , productos);
    };

    async  guardar ( archivo , producto) {
        let productoJ= JSON.stringify(producto)
        console.log(productoJ)
        try {
    
            await fs.promises.writeFile(archivo, `${productoJ}`)
            console.log(`se agregó el texto exitosamente`)
        }
        catch (err) {
            
        }
    };
}



let product = new Contenedor('productos.txt')
let productosD=[];

 app.get('/', ( req , res ) => {
    res.send('desafio 3')
    })
            
app.get('/productos', async( req , res ) => {
    productosD = await product.getAll();
    res.send(productosD);
    });
        
app.get('/productoRandom', async ( req , res ) => {
    productosD = await product.getAll();
    let id =Math.floor( Math.random() * (3 - 1) + 1);
    console.log(id)
    let productoR = productosD.find((valor)=> valor.id === id);
    console.log(productoR)
    res.send(productoR)
    });
            
app.listen(port, () => {
    console.log(`tu servidor está corriendo en el puerto ${port}`)
    }); 








