class Usuario{
    constructor(nombre, apellido , libros , mascotas){
        this.nombre=nombre;
        this.apellido=apellido;
        this.libros=libros;
        this.mascotas=mascotas;
    }
getfullname(){
        return this.nombre+ ' ' + this.apellido;
};

addMascota(newMascota){
        return this.mascotas.push(newMascota);
};

countMascotas(){
    return this.mascotas.length;
};

addBook(newlibro){
    this.libros.push(newlibro)
};

getBooksNames(){
    let listalibros= this.libros
    return listalibros.map((libro)=>libro.nombre)
};

};

let newMascot= 'hamster';

let newBook= {nombre:'Mi libro', autor:'yo'};

const usuario1 = new Usuario('Christian', 'Woolf', [{nombre:'Harry potter' , autor:'JK Rowling'} , {nombre:'La odisea' , autor:'Homero'}] , ['perro', 'gato', 'pez'])

console.log(usuario1.getfullname());

usuario1.addMascota(newMascot);

console.log(usuario1.countMascotas());

usuario1.addBook(newBook);

console.log(usuario1.getBooksNames());

console.log(usuario1);


