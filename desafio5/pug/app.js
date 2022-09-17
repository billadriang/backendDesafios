const express = require("express");

const productsRouter = require("./routes/products");
const app = express();
const puerto = 8080;

const server = app.listen(puerto, () => console.log("Server montado",puerto));
app.use(express.urlencoded({extended:true}))
app.use(express.json());
// app.use("/", express.static("public"));


app.set('views', './views');
app.set('view engine','pug');

app.get('/', (req, res) =>{
    res.render('create-product')
} )


app.use("/products", productsRouter);
