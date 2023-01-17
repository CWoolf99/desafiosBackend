const { options } = require("../options/mariaDB");
const knex = require('knex')(options);

async function createProducto({producto}) {
    const productos = await getProductos();
    const id = productos.length;
    const nuevoproducto = {...producto, id: productos.length}
    await knex("productos").insert(nuevoproducto)
    return nuevoproducto;
}

async function getProductos() {
    return await knex("productos").select("*")
}

async function updateProducto({id, producto}) {
    await knex("productos").where("id",id).update({nombre:producto.nombre , precio:producto.precio , imagen:producto.imagen})
    return {id , ...producto}
}

async function deleteProducto({id}) {
    const productoEliminado = await knex("productos").where("id","=",id).select("*")
    await knex("productos").where("id","=",id).del()
    return productoEliminado;
}

module.exports = { getProductos , createProducto , updateProducto , deleteProducto }