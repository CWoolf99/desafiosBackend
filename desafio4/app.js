import express from "express";
import { Router } from "express";
import Contenedor from "./api.js";

const contenedor = new Contenedor;

const app = express();
const router = Router();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const Port = 8080;

/*---------Router-------- */
router.get('/', (req , res ) => {
    res.send(contenedor.listaproductos())
})

router.get('/:id', (req , res ) => {
    const productoE = contenedor.buscarproducto(req.params.id)
    if(productoE){
    res.send(productoE)
    }  else{
    res.send(`error producto no encontrado`)
    }
})

router.post('/', (req , res ) => {
    res.send(contenedor.guardar(req.body))
})

router.put('/:id', (req , res ) => {
    const productosA = contenedor.actualizaproducto(req.params.id , req.body )
    if (productosA){
    res.send(`se ha actualizado el producto con id ${req.params.id} a: ${JSON.stringify(productosA)}`)
}else{
        res.send(`error producto no encontrado`)
        }
})

router.delete('/:id', (req , res ) => {
    res.send(contenedor.eliminaproducto(req.params.id))
})

app.use(express.static('public'))
app.use('/api/productos', router)

app.listen(Port);