const express = require("express");
const productsRouter = require("./routes/products");
const app = express();
const puerto = 8080;

const server = app.listen(puerto, () => console.log("Server montado"));

app.use(express.json());
app.use("/", express.static("public"));
app.use("/api/products", productsRouter);
