import { Usuario } from "./desafio1Usuarios.js";

const usuario = new Usuario('Bill','Gaize',[{'nombre':' La Divina Comedia',autor:'Dante Alighieri'},{nombre:'Metamorfosis', autor:'Franz Kafka'}],['tobby','tobby2'])

// fullName()
const fullName = document.getElementById("fullName")
fullName.innerHTML = usuario.getFullName()

// addMascota()
usuario.addMascota('Rex')

// countMascotas()
const petNumber = document.getElementById("petNumber")
petNumber.innerHTML = usuario.countMascotas()

// addbook()
usuario.addBook('1984', 'George Orwell')

// getBookNames()
const books = document.getElementById("books")
books.innerHTML = usuario.getBookNames()