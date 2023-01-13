const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// models
const User = require("./models/user");

const mongoConnect = require("./util/database").mongoConnect;

const app = express();

// Template Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('63bfd4b15c6a1f2034b9472d')
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch(err => console.log(err))
})


// router 
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use('/admin', adminRoutes);
app.use(shopRoutes);

mongoConnect(() => {
    app.listen(3000);
})