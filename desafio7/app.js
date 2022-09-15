const express = require("express");
const { Server : Httpserver } = require("http");
const { Server : IOServer } = require("socket.io");

const Contenedor = require("./clases/productos");
const ContenedorMensajes = require("./clases/msjs");
const { options } = require("./options/mariaDB");
const { optionsChat } = require("./options/sqlite3");

const contenedor = new Contenedor(options);
const contenedorMensajes = new ContenedorMensajes( optionsChat );

const app = express();
const httpServer = new Httpserver(app);
const io = new IOServer(httpServer);

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    contenedor.crearTabla().then((prods) => {
        console.log('Tabla productos funcionando');
        contenedor.listaproductos().then((prods) => {
          socket.emit("productos", prods);
        })
      })

      socket.on("update", async (data) => {
        await contenedor.guardar(data).then((data) => {
          contenedor.listaproductos().then((productos) => {
            console.log(productos);
            io.sockets.emit("productos", productos);
          })
        })
    });
    contenedorMensajes.crearTabla().then((msjs)=>{
        console.log('Tabla chat funcionando');
        contenedorMensajes.getAll().then((msjs)=>{
            socket.emit('mensajes',  msjs);
        })
    });

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await contenedorMensajes.save(mensaje).then((msjs)=>{
            contenedorMensajes.getAll().then((msjs)=>{
                io.sockets.emit('mensajes', msjs);
            })
        })
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