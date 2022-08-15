export class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    // String. Retorna el completo del usuario. Utilizar template strings.
    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    // void. Recibe un nombre de mascota y lo agrega al array de mascotas.
    addMascota(newMascota){
        this.mascotas = [...this.mascotas, newMascota];
    }

    // Number. Retorna la cantidad de mascotas que tiene el usuario.
    countMascotas(){
        return this.mascotas.length;
    }

    // void. Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto: { nombre: String, autor: String } al array de libros.
    addBook(nombre, autor) {
        this.libros = [...this.libros, {nombre: nombre, autor: autor}];
    }

    // String[]. Retorna un array con sólo los nombres del array de libros del usuario.
    getBookNames(){
        return this.libros.map((res) => res.nombre);
    }
}