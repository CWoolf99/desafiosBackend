const request = require("supertest")("http://localhost:8080")
const expect = require("chai").expect
const {faker} = require('@faker-js/faker')

const productos = [
    {nombre:faker.commerce.product(), precio:10, imagen:faker.image.image(),},
    {nombre:faker.commerce.product(), precio:20, imagen:faker.image.image(),},
    {nombre:faker.commerce.product(), precio:30, imagen:faker.image.image(),},
    {nombre:faker.commerce.product(), precio:40, imagen:faker.image.image(),},
    {nombre:faker.commerce.product(), precio:50, imagen:faker.image.image(),},
    {nombre:faker.commerce.product(), precio:60, imagen:faker.image.image(),},
    {nombre:faker.commerce.product(), precio:70, imagen:faker.image.image(),},
    {nombre:faker.commerce.product(), precio:80, imagen:faker.image.image(),},
    {nombre:faker.commerce.product(), precio:90, imagen:faker.image.image(),},
    {nombre:faker.commerce.product(), precio:100, imagen:faker.image.image(),}
]

const productosPut = [
    {id:20,nombre:faker.commerce.product(), precio:10, imagen:faker.image.image(),},
    {id:21,nombre:faker.commerce.product(), precio:20, imagen:faker.image.image(),},
    {id:22,nombre:faker.commerce.product(), precio:30, imagen:faker.image.image(),},
    {id:23,nombre:faker.commerce.product(), precio:40, imagen:faker.image.image(),},
    {id:24,nombre:faker.commerce.product(), precio:50, imagen:faker.image.image(),},
    {id:25,nombre:faker.commerce.product(), precio:60, imagen:faker.image.image(),},
    {id:26,nombre:faker.commerce.product(), precio:70, imagen:faker.image.image(),},
    {id:27,nombre:faker.commerce.product(), precio:80, imagen:faker.image.image(),},
    {id:28,nombre:faker.commerce.product(), precio:90, imagen:faker.image.image(),},
    {id:29,nombre:faker.commerce.product(), precio:100, imagen:faker.image.image(),}
]

const ids = [30,31,32,33,34,35,36,37,38,39]

describe('test productos api' , () => {
    describe('GET', () => {
        it('debería retornar un status 200', async () => {
            let response = await request.get('/api-prods')
            expect(response.status).to.eql(200)
        })
    })
    describe('POST', () => {
        it('debería incorporar un producto', async () => {
            productos.forEach(async producto=> {
                let response = await request.post('/api-prods').send(producto)
                expect(response.status).to.eql(200)
                const product = response.body
                expect(product).to.include.keys('nombre','precio','imagen')
                expect(product.nombre).to.eql(producto.nombre)
                expect(product.precio).to.eql(producto.precio)
                expect(product.imagen).to.eql(producto.imagen)
            });
        })
    })
    describe('PUT', () => {
        it('debería actualizar un producto', async () => {
            productosPut.forEach(async producto=> {
                let response = await request.put('/api-prods').send(producto) 
                expect(response.status).to.eql(200)
                const product = response.body
                expect(product).to.include.keys('id','nombre','precio','imagen')
                expect(product.id).to.eql(producto.id)
                expect(product.nombre).to.eql(producto.nombre)
                expect(product.precio).to.eql(producto.precio)
                expect(product.imagen).to.eql(producto.imagen)
            });   
        })
    })
    describe('DELETE', () => {
        it('debería eliminar un producto', async () => {
            ids.forEach(async id=> { 
                let response = await request.delete(`/api-prods/${id}`)
                expect(response.status).to.eql(200)
                const product = response.body
                expect(product).to.include.keys('id')
                expect(product.id).to.eql(`${id}`)
            });
        })
    })
})