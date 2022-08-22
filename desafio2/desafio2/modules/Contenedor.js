import {
    constants,
    writeFile
} from "node:fs";
import {
    readFile,
    access
} from "node:fs/promises";

export class Contenedor {
    constructor(camino) {
        this.camino = camino;
    }
    // save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async save(product) {
        try {
            await this.obtenTodos();
            const nuevoId = await this.ultimoId(this.products);
            product = {
                id: nuevoId,
                ...product,
            };
            this.products = [...this.products, product];
            writeFile(this.camino, JSON.stringify(this.products, null, 2), (err) => {
                !err && console.log(`producto anadido con id ${nuevoId}`);
            });
        } catch (err) {
            throw err.message;
        }
    }
    // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async obtenPorId(id) {
        try {
            if (await this.existeProducto(id)) {
                return this.products.find((res) => res.id == parseInt(id));
            } else {
                return null;
            }
        } catch (err) {
            throw err.message;
        }
    }
    // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    async obtenTodos() {
        try {
            if ((await readFile(this.camino, "utf-8")) !== []) {
                return (this.products = JSON.parse(
                    await readFile(this.camino, "utf-8")
                ));
            }
            return null;
        } catch (err) {
            throw err.message;
        }
    }
    // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
    async borraPorId(id) {
        try {
            let i = 0;
            for (const producto of this.products) {
                if (producto.id == parseInt(id)) {
                    this.products.splice(i, 1);
                    writeFile(
                        this.camino,
                        JSON.stringify(this.products, null, 2),
                        (err) => {
                            !err && console.log(`producto con id: ${id} eliminado`);
                        }
                    );
                    return;
                }
                i = i + 1;
            }
        } catch (err) {
            throw err.message;
        }
    }
    // deleteAll(): void - Elimina todos los objetos presentes en el archivo.
    async borrarTodo() {
        try {
            writeFile(this.camino, JSON.stringify([], null, 2), (err) => {
                !err && console.log(`Todo fue borrado exitosamente!`);
            });
        } catch (err) {
            throw err.message;
        }
    }


//Revisa los permisos y la disponibilidad del archivo, sino lo crea
    async archivoDisponible() {
        try {
            await access(this.camino, constants.R_OK);
        } catch {
            writeFile(this.camino, JSON.stringify([], null, 2), (err) => {
                !err && console.log("Crea");
            });
        }
    }
    // Retorna el ultimo id del producto, sino retorna 1 
    async ultimoId() {
        try {
            if (this.products.length === 0) {
                return 1;
            }
            let nuevoId = this.products[this.products.length - 1];
            return nuevoId.id + 1;
        } catch (err) {
            throw err.message;
        }
    }

    //Toma el id y revisa si ya existe
    async existeProducto(id) {
        const existe = this.products.some((res) => res.id == parseInt(id));
        return existe;
    }
}
