const repoProds = require("../persistencia/repos/repoProds")
const { infoLogger } = require("../servicios/logger");

const contenedor = new repoProds();

async function crearTabla () {
await contenedor.crearTabla()
};

crearTabla()

async function getProductos (req,res) {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    const productos = await contenedor.listaproductos()
    res.json(productos)
}

async function postProductos (req,res) {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    const { nombre  , precio , imagen } = req.body
    const producto = { nombre:nombre , precio:precio , imagen:imagen }
    let response = await contenedor.guardar(producto)
    res.send(producto)
}

async function putProductos (req,res) {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    const { nombre  , precio , imagen , id } = req.body
    const producto = { nombre:nombre , precio:precio , imagen:imagen }
    await contenedor.actualizaproducto(id,producto)
    res.send({id,...producto})
}

async function delProducto (req,res) {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    const id = req.params
    await contenedor.eliminaproducto(id.id)
    res.send(id)
}
module.exports= { getProductos , postProductos , putProductos , delProducto }