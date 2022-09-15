const socket = io.connect();


const agregarProducto = document.getElementById('formProductos')
agregarProducto.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        nombre: agregarProducto[0].value,
        precio: agregarProducto[1].value,
        imagen: agregarProducto[2].value
    }
    socket.emit('update', producto);
    agregarProducto.reset()
});

socket.on('productos', productos => {
    listaProductos(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })
});

function listaProductos(prods) {
    return fetch('plantillas/lista.hbs')
        .then(respuesta => respuesta.text())
        .then(texto => {
            const listahbs = Handlebars.compile(texto);
            const lista = listahbs({ prods })
            return lista
        })
}

const formMensaje = document.getElementById('formMensajes')
formMensaje.addEventListener('submit', e => {
    e.preventDefault()
    const mensaje = { 
        usuario: formMensaje[0].value, 
        texto: formMensaje[1].value 
    }
    console.log (mensaje)
    socket.emit('nuevoMensaje', mensaje);
    formMensaje.reset()
})

socket.on('mensajes', mensajes => {
    console.log(mensajes);
    const html = listaMensajes(mensajes)
    document.getElementById('mensajes').innerHTML = html;
})

function listaMensajes(mensajes) {
    return mensajes.map(mensaje => {
        return (`
            <div>
                <b style="color:blue;">${mensaje.usuario}</b>
                [<span style="color:brown;">${mensaje.fyh}</span>] :
                <i style="color:green;">${mensaje.texto}</i>
            </div>
        `)
    }).join(" ");
};