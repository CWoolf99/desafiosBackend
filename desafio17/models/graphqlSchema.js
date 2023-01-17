const { buildSchema } = require("graphql")

const graphqlSchema = buildSchema(`
  input ProductoInput {
    nombre: String
    precio: Int
    imagen: String
  }
  type Producto {
    id: ID!
    nombre: String
    precio: Int
    imagen: String
  }
  type Query {
    getProductos(campo: String, valor: String): [Producto]
  }
  type Mutation {
    createProducto(producto:ProductoInput!): Producto
    updateProducto(id: ID!, producto: ProductoInput!): Producto
    deleteProducto(id: ID!): Producto
  }
`)

module.exports = graphqlSchema