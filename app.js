class Usuario{
    constructor(nombre, apellido , libros , mascotas){
        this.nombre=nombre;
        this.apellido=apellido;
        this.libros=libros;
        this.mascotas=mascotas;
    }
}
const usuario1 = new Usuario('Christian', 'Woolf', [{nombre:'Harry potter' , autor:'JK Rowling'} , {nombre:'La odisea' , autor:'Homero'}] , ['perro', 'gato', 'pez'])
console.log(usuario1)

const getfullname=()=>{
    console.log( usuario1.nombre+ ' ' + usuario1.apellido);
}

const addMascota=(newMascota)=>{
    usuario1.mascotas.push(newMascota);
    console.log(usuario1.mascotas);
}

const countMascotas=()=>{
    console.log(usuario1.mascotas.length);
}

const addBook=(newlibro)=>{
    usuario1.libros.push(newlibro)
    console.log(usuario1.libros)
}

const getBooksNames=()=>{
    let listalibros= usuario1.libros
    const nombres= listalibros.map((libro)=>libro.nombre)
    console.log(nombres)
}

let newMascot= 'hamster';

let newBook= {nombre:'Mi libro', autor:'yo'};

getfullname();

addMascota(newMascot);

countMascotas();

addBook(newBook);

getBooksNames();