const {faker} = require('@faker-js/faker')
faker.locale='es'

function generarProducto(id){
    return {
        id,
        nombre:faker.commerce.product(),
        imagen:faker.image.image(),
        precio:faker.commerce.price()
        }
}

module.exports= generarProducto;