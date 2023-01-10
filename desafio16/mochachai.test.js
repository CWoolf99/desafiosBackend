const request = require("supertest")("http://localhost:8080")
const expect = require("chai").expect

describe('test productos api' , () => {
    describe('GET', () => {
        it('debería retornar un status 200', async () => {
            let response = await request.get('/api-prods')
            expect(response.status).to.eql(200)
        })
    })
    describe('POST', () => {
        it('debería incorporar un producto', async () => {
            let producto = {nombre:'Prueba Mocha', precio:100, imagen:'https://s10.s3c.es/imag/_v0/770x420/a/b/3/600x400_La-orilla-del-mar-con-el-sol-poniendose-al-fondo-iStock.jpg'}
            let response = await request.post('/api-prods').send(producto)
            expect(response.status).to.eql(200)
            const product = response.body
            expect(product).to.include.keys('nombre','precio','imagen')
            expect(product.nombre).to.eql(producto.nombre)
            expect(product.precio).to.eql(producto.precio)
            expect(product.imagen).to.eql(producto.imagen)
        })
    })
    describe('PUT', () => {
        it('debería actualizar un producto', async () => {
            let producto = {id:5 ,nombre:'PruebaPut Mocha', precio:200, imagen:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-card-40-macbook-air-202110_FMT_WHH?wid=750&hei=900&fmt=p-jpg&qlt=95&.v=1664576114959'}
            let response = await request.put('/api-prods').send(producto)
            expect(response.status).to.eql(200)
            const product = response.body
            expect(product).to.include.keys('id','nombre','precio','imagen')
            expect(product.id).to.eql(producto.id)
            expect(product.nombre).to.eql(producto.nombre)
            expect(product.precio).to.eql(producto.precio)
            expect(product.imagen).to.eql(producto.imagen)
        })
    })
    describe('DELETE', () => {
        it('debería eliminar un producto', async () => {
            let id = 13
            let response = await request.delete(`/api-prods/${id}`)
            expect(response.status).to.eql(200)
            const product = response.body
            expect(product).to.include.keys('id')
            expect(product.id).to.eql(`${id}`)
            
        })
    })
})