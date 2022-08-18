class Contenedor {
    constructor() {
        this.productos = [];
        this.id = 1;
    }

    guardar(producto) {
        const nuevoproducto = {...producto, id: this.id}
        this.productos.push(nuevoproducto)
        this.id = this.id+1 ;
        return `se ha agregado ${JSON.stringify(this.productos)}`
    }

    listaproductos() {
        return this.productos
    }

    buscarproducto(id) {
        return this.productos.find((valor) => valor.id == id )
    }

    actualizaproducto(id, producto) {
        if(this.productos.find((valor) => valor.id == id)){
        this.productos = this.productos.filter((producto) => producto.id != id)
        const productoA = {...producto, id: id} 
        this.productos.push(productoA)
        return productoA;
        } else{
            return undefined
        }
    }

    eliminaproducto(id) {
        if(this.productos.find((valor) => valor.id == id)){
        this.productos = this.productos.filter((producto) => producto.id != id)
        return `producto eliminado ${JSON.stringify(this.productos)}`
        } else{
            return 'error producto no encontrado'
        }
    }
}
export default Contenedor; 