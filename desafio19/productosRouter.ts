import { Router } from "./deps.ts";
import { getProductos , addProductos , updateProducto , deleteProducto } from "./productosController.ts";

const router = new Router();

router
  .get("/api/productos", getProductos)
  .post("/api/productos", addProductos)
  .put("/api/productos/:id", updateProducto)
  .delete("/api/productos/:id", deleteProducto)

  export default router;