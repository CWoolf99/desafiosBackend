class Usuario{
    constructor(nombre, apellido , libros , mascotas){
        this.nombre=nombre;
        this.apellido=apellido;
        this.libros=libros;
        this.mascotas=mascotas;
    }
}
const usuario1 = new Usuario('Christian', 'Woolf', ['Harry potter' , 'EL principito'] , ['perro', 'gato', 'pez'])