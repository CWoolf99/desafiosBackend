const express = require('express')

const Contenedor = require('./api/api')

const contenedor = new Contenedor()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set("views", "./views");
app.set("view engine", "ejs");


app.post('/productos', (req , res ) => {
    contenedor.guardar(req.body)
    res.redirect('/')
})

app.get('/productos', (req , res ) => {
    const productos = contenedor.listaproductos();
    console.log(productos)
    res.render('lista', {prods:productos , existelista:productos.length})
})


const PORT = 8080
app.listen(PORT);