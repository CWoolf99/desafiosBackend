const express = require("express");
const { Server : Httpserver } = require("http");
const { Server : IOServer } = require("socket.io");
const handlebars = require('express-handlebars')
const {normalize , denormalize , schema} = require("normalizr");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const Contenedor = require("./clases/productos");
const { options } = require("./options/mariaDB");
const MsjsDaoFs = require("./dao/msjsDaoFs");
//const MsjsDaoFbs = require("./dao/msjsDaoFbs");

const path = require("path")
const formLogin = require("./public/login")


const contenedor = new Contenedor(options);
const contenedorMensajes = new MsjsDaoFs();

const autor = new schema.Entity('autores', {} , {idAttribute:'id'});
const mensaje = new schema.Entity('mensajes',{autor:autor},);

const app = express();
const httpServer = new Httpserver(app);
const io = new IOServer(httpServer);


let id = 1;
function getNextId(){
    return id++
}

/*app.get('/api/productos-test', (req,res)=>{
    const productos= crearProds(5)
    listaProductos(productos).then(html => {
        res.html(html)
    })
})

function listaProductos(prods) {
    return fetch('public/plantillas/lista.hbs')
        .then(respuesta => respuesta.text())
        .then(texto => {
            const listahbs = Handlebars.compile(texto);
            const lista = listahbs({ prods })
            return lista
        })
}*/

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    /*contenedor.crearTabla().then((prods) => {
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
    });*/

    contenedorMensajes.getAll().then((msjs)=>{
        let denormalizeMsjs;
        if (msjs === 0){
            denormalizeMsjs=[];
        } else{
            denormalizeMsjs = denormalize(msjs.result , [mensaje] , msjs.entities)
        }
        socket.emit('mensajes',  denormalizeMsjs);
    })

    socket.on('nuevoMensaje', async msjs => {
        msjs.id = JSON.stringify(getNextId())
       const mensajesA = await contenedorMensajes.getAll()
        let normalizeMsjs;
        if(mensajesA === 0){
            normalizeMsjs = normalize([msjs], [mensaje])
        } else {
            const denormalizeMsjsA = denormalize(mensajesA.result , [mensaje] , mensajesA.entities)
            const mensajeDesN = [...denormalizeMsjsA,msjs]
            normalizeMsjs = normalize(mensajeDesN, [mensaje]) 
        }
        await contenedorMensajes.save(normalizeMsjs).then((msjs)=>{
            contenedorMensajes.getAll().then((msjs)=>{
                const denormalizeMsjs = denormalize(msjs.result , [mensaje] , msjs.entities)
                io.sockets.emit('mensajes', denormalizeMsjs);
            })
        })
    })
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('views'))

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
        layoutsDir:__dirname + '/views/layouts',
        partialsDir:__dirname + '/views/partials'
    })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(session({
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://Cwoolf99:Cw1234567$@cluster0.pbwjegv.mongodb.net/?retryWrites=true&w=majority'}),
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}))

//Rutas de login o logout

app.get('/' , (req,res) => {
    if (req.session?.nombre){
        res.render('logged', {nombre:req.session.nombre})
    } else {
        res.redirect('login')
    }
})
app.get('/login' , (req,res) => {
    if(req.session?.nombre){
        res.redirect('/')
    } else {
    res.render('formLogin')
}
})

app.post('/login' , (req,res) => {
    req.session.nombre= req.body.nombre
    res.redirect('/')
}) 

app.get('/logout' , (req,res) => {
    req.session.destroy(err => {
    if (!err) {
        res.render('logout', {nombre:req.session.nombre}) 
         
    } else {
        res.redirect('/login')
    }}); 
})

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))