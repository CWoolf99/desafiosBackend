const express = require("express");
const { getProductos , postProductos , putProductos , delProducto } = require("../controllers/productos")

const { Router } = express;

const RouterP = Router();

RouterP.get("/" , getProductos);

RouterP.post("/" , postProductos);

RouterP.put("/" , putProductos);

RouterP.delete("/:id" , delProducto);

module.exports = RouterP;