const http         = require("http");
const express      = require("express");
const bodyParser   = require('body-parser')
const adminRouter  = require('./routes/admin');
const clientRouter = require('./routes/client');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))


app.use(adminRouter);
app.use(clientRouter);

// 404
app.use((req, res, next) => {
    res.status(404).send("<p>Page not found</p>");
})


const server = http.createServer(app);

server.listen(5000);