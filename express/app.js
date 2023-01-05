const http = require("http");
const express = require("express");

const app = express();

app.use((req, res, next) => {
    console.log("First Middleware");
    next();
});

app.use((req, res, next) => {
    console.log("Second Middleware");
});

const server = http.createServer(app);

server.listen(5000);