const express = require("express");
const { Server : Httpserver } = require("http");
const { Server : IOServer } = require("socket.io");

const Contenedor = require("./clases/api")
const ContenedorMensajes = require("./clases/msjs")

const contenedor = new Contenedor;
const contenedorMensajes = new ContenedorMensajes('mensajes.txt');

const app = express();
const httpServer = new Httpserver(app);
const io = new IOServer(httpServer);

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    socket.emit('productos', contenedor.listaproductos());

    socket.on('update', producto => {
        contenedor.guardar(producto)
        io.sockets.emit('productos', contenedor.listaproductos());
    })

socket.emit('mensajes', await contenedorMensajes.getAll());

socket.on('nuevoMensaje', async mensaje => {
    mensaje.fyh = new Date().toLocaleString()
    await contenedorMensajes.save(mensaje)
    io.sockets.emit('mensajes', await contenedorMensajes.getAll());
})
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))