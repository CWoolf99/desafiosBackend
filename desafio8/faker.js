const faker = require('faker');

let id = 1;
function subirId(){
    return id++
}
function generarProducto(id){
    return {
        id,
        nombre:faker.commerce.product(),
        imagen:faker.image.cats(),
        precio:faker.finance.amount()
        }
}

function crearProds(cant){
    const productos=[]
    for(let i=0;1<cant;i++){
        productos.push(generarProducto(subirId()))
    }
}

module.exports=crearProds;