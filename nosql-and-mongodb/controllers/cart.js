const Product = require("./../models/product");

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
}


exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => console.log(err));
};


exports.deleteItemCart = (req, res, next) => {
  const productId = req.body.productId;
  req.user.deleteItemFormCart(productId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => {
      console.log(err);
    })
}