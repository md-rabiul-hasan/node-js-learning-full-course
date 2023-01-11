const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");

// database 
const sequelize = require("./util/database");
const User = require("./models/user");
const Product = require("./models/product");
const Cart = require("./models/cart");
const Order = require("./models/order");
const CartItem = require("./models/cart-item");
const OrderItem = require("./models/order-item");





const app = express();

// Template Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err)
    })
})

// Database Association
User.hasMany(Product);
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
Cart.belongsTo(User);
User.hasOne(Cart);
Order.belongsTo(User);
User.hasMany(Order);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsToMany(Product, { through: OrderItem });


// router
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
app.use('/admin', adminRoutes);
app.use(shopRoutes);





// Test the connection
sequelize
  .sync()
  .then((result) => {
    return User.findById(1);
    // console.log('Connection has been established successfully.');
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: 'Max',
        email: 'test@test.com'
      });
    }
    return user;
  })
  .then(user => {
    user.getCart()
      .then(cart => {
        if(cart){
          return cart;
        }
        return user.createCart();
      })

  })
  .then(cart => {
    app.listen(3000);
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

