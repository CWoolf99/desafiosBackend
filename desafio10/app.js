const express = require("express");
const { Server : Httpserver } = require("http");
const { Server : IOServer } = require("socket.io");
const handlebars = require('express-handlebars')
const {normalize , denormalize , schema} = require("normalizr");
const session = require("express-session");
const mongoose = require("mongoose")
const passport = require("passport");

const Contenedor = require("./clases/productos");
const { options } = require("./options/mariaDB");
const MsjsDaoFs = require("./dao/msjsDaoFs");
const checkAuthentication = require("./auth/auth");
const {signup , login }= require("./controllers/controllers");
const user = require("./models/user");
//const MsjsDaoFbs = require("./dao/msjsDaoFbs");



async function connect(){ 
    await mongoose.connect('mongodb://localhost:27017/desafios',{serverSelectionTimeoutMS: 5000,})
    return console.log("mongo conectado")};

connect();

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
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 600000
    }
}))

app.use(passport.initialize());
app.use(passport.session());

//Rutas /////////////////

app.get('/' , checkAuthentication , (req,res) => {
        res.render('logged', {nombre:req.user.username})
    
});
//Sign up///////
app.get('/signup', (req,res) => {
    res.render('signUp.hbs')
});
app.post('/signup', passport.authenticate('signup', {failureRedirect:'/errorSignUp'}), signup);
app.get('/errorSignUp', (req,res) => {
    res.render('errorSignUp')
})

//log in////////
app.get('/login' , (req,res) => {
    if(req.isAuthenticated()){
        res.redirect('/')
    } else {
    res.render('formLogin')
}
});

app.post('/login' , passport.authenticate('login', {failureRedirect:'/errorLogIn'}),  login); 
app.get('/errorLogIn', (req,res) => {
    res.render('errorLogIn')
})
//log out//////////
app.get('/logout' , (req,res) => {
    let nombre = req.user.username
    req.logout(err => {
    if (!err) {
        res.render('logout', {nombre:nombre}) 
         
    } else {
        res.redirect('/login')
    }}); 
})

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))