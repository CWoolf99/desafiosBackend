import { MongoClient } from "./deps.ts";
import { productos } from "./productosModel.ts";

const client = new MongoClient();

await client.connect({
    db: "test",
    tls: true,
    servers: [
      {
        host: "",
        port: 27017,
      },
    ],
    credential: {
      username: "",
      password: "",
      db: "test",
      mechanism: "SCRAM-SHA-1",
    },
  }).then((res)=>{console.log(`Base de datos conectada`)})

const db = client.database("test");
const productosDB = db.collection<productos>("productosDeno");

const getProductos = async ({ response }: { response: any }) => {
    try {
      const allProductos = await productosDB.find({}, { noCursorTimeout: false}).toArray();
      if (allProductos) {
        response.status = 200;
        response.body = {
          success: true,
          data: allProductos,
        };
      } else {
        response.status = 500;
        response.body = {
          success: false,
          msg: "Internal Server Error",
        };
      }
    } catch (err) {
      response.body = {
        success: false,
        msg: err.toString(),
      };
    }
  };

  const addProductos = async ({
    request,
    response,
  }: {
    request: any;
    response: any;
  }) => {
    try {
      if (!request.hasBody) {
        response.status = 400;
        response.body = {
          success: false,
          msg: "No Data",
        };
      } else {
        const body = await request.body();
        const productoN = await body.value;
        await productosDB.insertOne(productoN);
        response.status = 201;
        response.body = {
          success: true,
          data: productoN,
        };
      }
    } catch (err) {
      response.body = {
        success: false,
        msg: err.toString(),
      };
    }
  };

  const updateProducto = async ({
    params,
    request,
    response,
  }: {
    params: { id: string };
    request: any;
    response: any;
  }) => {
    try {
      const body = await request.body();
      const inputProducto = await body.value;
      await productosDB.updateOne(
        { productoId: params.id },
        { $set: { nombre: inputProducto.nombre, precio: inputProducto.precio, descripcion: inputProducto.descripcion } }
      );
      const updatedProducto = await productosDB.findOne({ productoId: params.id }, { noCursorTimeout: false});
      response.status = 200;
      response.body = {
        success: true,
        data: updatedProducto,
      };
    } catch (err) {
      response.body = {
        success: false,
        msg: err.toString(),
      };
    }
  };

  const deleteProducto = async ({
    params,
    response,
  }: {
    params: { id: string };
    request: any;
    response: any;
  }) => {
    try {
      await productosDB.deleteOne({ productoId: params.id });
      response.status = 201;
      response.body = {
        success: true,
        msg: "Product deleted",
      };
    } catch (err) {
      response.body = {
        success: false,
        msg: err.toString(),
      };
    }
  };

  export { getProductos , addProductos , updateProducto , deleteProducto }