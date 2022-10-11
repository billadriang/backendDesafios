import { knex } from '../../db.js';

const productos = [

    {
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
        title: 'PARACETAMOL',
        price: 100,
        description: 'Analgesico',
        code: 'XY-1',
        image: 'https://www.laboratoriochile.cl/wp-content/uploads/2015/11/Paracetamol_500MG_16C_BE_HD.jpg',
        stock: 15
    },
    {
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
        title: 'IBUPROFENO',
        price: 200,
        description: 'AINE',
        code: 'XY-2',
        image: 'https://www.laboratoriochile.cl/wp-content/uploads/2019/03/Ibuprofeno_600MG_20C_BE_HD.jpg',
        stock: 250
    },
    {
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
        title: 'METFORMINA',
        price: 300,
        description: 'HIPOGLUCEMIANTE',
        code: 'XY-3',
        image: 'https://www.laboratoriochile.cl/wp-content/uploads/2015/11/Metformina_850MG_60C_BE_HD.jpg',
        stock: 350
    },
    {
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
        title: 'LEVOTIROXINA',
        price: 400,
        description: 'HORMONAL',
        code: 'XY-4',
        image: 'https://www.ecofarmacias.cl/wp-content/uploads/2022/01/levotiroxina-sodica-100-mcg-x-84-comprimidos.jpg',
        stock: 450
    },
]

const carritos = [
    {
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')
    },
    {
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')
    },
    {
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }
]

const productoCarritoRelations = [
    {
        carritoId: 2,
        productoId: 1
    },
    {
        carritoId: 2,
        productoId: 2
    },
    {
        carritoId: 2,
        productoId: 3
    }
]

export async function populateProducts() {
    try {
        await knex.insert(productos).from('producto');
        console.log('AGREGAGOS PRODUCTOS A LA TABLA')
    } catch (error) {
        console.log(error);
    } 
}

export async function populateCarts() {
    try {
        await knex.insert(carritos).from('carrito');
        console.log('AGREGADOS CARRITOS A LA TABLA')
    } catch (error) {
        console.log(error);
    } 
}

export async function populateProductoCarrito() {
    try {
        await knex.insert(productoCarritoRelations).from('productoCarrito');
        console.log('RELACIONES AGREGADAS')
        return;
    } catch(error) {
        console.log(error);
    }
}