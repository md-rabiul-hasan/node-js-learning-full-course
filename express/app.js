const http = require("http");
const express = require("express");
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/product', (req, res, next) => {
    res.send("<form action='add-product' method='POST'><input type='text' name='title'/><button type='submit'>Submit</button></form>")
});

app.use('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect("/product");
});


const server = http.createServer(app);

server.listen(5000);