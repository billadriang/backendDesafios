const express = require('express')
const fs = require('fs')
const app = express()

const allFileContents = fs.readFileSync('productos.txt');
const resultData = JSON.parse(allFileContents.toString().trim());

app.listen(8080, () => {
    console.log('Server up in port 8080')
})

app.get('/', (req, res) => {
    res.send('Hola Mundo')
});

app.get('/productos', (req, res)=>{
    res.send(resultData)
})

app.get('/productoRandom', (req, res) =>{
    const random = Math.floor(Math.random() * resultData.length)
    res.send(resultData[random])
})