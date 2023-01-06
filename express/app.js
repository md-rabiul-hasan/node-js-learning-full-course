const path         = require("path");
const http         = require("http");
const express      = require("express");
const bodyParser   = require('body-parser')
const adminRouter  = require('./routes/admin');
const clientRouter = require('./routes/client');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))


app.use('/admin', adminRouter);
app.use(clientRouter);

// 404
app.use((req, res, next) => {
    res.status(404).send("<p>Page not found</p>");
})

app.listen(3000);