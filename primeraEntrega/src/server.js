const express = require('express');
const app = express();
const Contenedor = require('./contenedor')
const contenedor = new Contenedor("productos.json", ["timestamp", "title", "price", "description", "code", "image", "stock"]);
const carrito = new Contenedor("carrito.json", ["timestamp", "products"])

const dotenv = require('dotenv');
dotenv.config();
console.log(`Puerto ${process.env.TOKEN}`);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const authMiddleware = app.use((req, res, next) => {
    req.header('authorization') == process.env.TOKEN 
        ? next()
        : res.status(401).json({"error": "No autorizado"})
})

const routerProducts = express.Router();
const routerCart = express.Router();

app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCart);

/* Productos */

// GET api/productos
routerProducts.get('/', async (req, res) => {
    const products = await contenedor.getAll();
    res.status(200).json(products);
})

// GET api/productos/:id
routerProducts.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await contenedor.getById(id);
    
    product
        ? res.status(200).json(product)
        : res.status(400).json({"error": "No encontre el producto"})
})

// POST api/productos
routerProducts.post('/',authMiddleware, async (req,res, next) => {
    const {body} = req;
    
    body.timestamp = Date.now();
    
    const newProductId = await contenedor.save(body);
    
    newProductId
        ? res.status(200).json({"success" : "Añadido con el id  "+newProductId})
        : res.status(400).json({"error": "clave invalida"})
})

// PUT api/productos/:id
routerProducts.put('/:id', authMiddleware ,async (req, res, next) => {
    const {id} = req.params;
    const {body} = req;
    const wasUpdated = await contenedor.updateById(id,body);
    
    wasUpdated
        ? res.status(200).json({"success" : "producto actualizado"})
        : res.status(404).json({"error": "no encontre el producto"})
})


// DELETE /api/productos/:id
routerProducts.delete('/:id', authMiddleware, async (req, res, next) => {
    const {id} = req.params;
    const wasDeleted = await contenedor.deleteById(id);
    
    wasDeleted 
        ? res.status(200).json({"success": "Producto eliminado"})
        : res.status(404).json({"error": "product no encontrado"})
})

/* Carrito */

// POST /api/carrito

routerCart.post('/', async(req, res) => {
    const {body} = req;
    
    body.timestamp = Date.now();
    body.products = [];
    const newCartId = await carrito.save(body);
    
    newCartId
        ? res.status(200).json({"success" : "Carrito añadido "+newCartId})
        : res.status(400).json({"error": "clave invalida"})
    
})

// DELETE /api/carrito/id
routerCart.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const wasDeleted = await carrito.deleteById(id);
    
    wasDeleted 
        ? res.status(200).json({"success": "carrito removido"})
        : res.status(404).json({"error": "carrito no encontrado"})
})

// POST /api/carrito/:id/productos
routerCart.post('/:id/productos', async(req,res) => {
    const {id} = req.params;
    const { body } = req;
    
    const product = await contenedor.getById(body['id']);
    
    if (product) {
        const cartExist = await carrito.addToArrayById(id, {"products": product});
        cartExist
            ? res.status(200).json({"success" : "producto añadido"})
            : res.status(404).json({"error": "carro no encontrado"})
    } else {
        res.status(404).json({"error": "producto no encontrado, verifica el id."})
    }
})

// GET /api/carrito/:id/productos
routerCart.get('/:id/productos', async(req, res) => {
    const { id } = req.params;
    const cart = await carrito.getById(id)
    
    cart
        ? res.status(200).json(cart.products)
        : res.status(404).json({"error": "carrito no encontrado"})
})

// DELETE /api/carrito/:id/productos/:id_prod
routerCart.delete('/:id/productos/:id_prod', async(req, res) => {
    const {id, id_prod } = req.params;
    const productExists = await contenedor.getById(id_prod);
    if (productExists) {
        const cartExists = await carrito.removeFromArrayById(id, id_prod, 'products')
        cartExists
            ? res.status(200).json({"success" : "producto removido"})
            : res.status(404).json({"error": "carrito no encontrado"})
    } else {
        res.status(404).json({"error": "no encontre el producto"})
    }
})

const PORT = 8080;
const server = app.listen(PORT, () => {
console.log(` Servidor iniciado en puerto ${PORT}`)
})

server.on('error', (err) => console.log(err));