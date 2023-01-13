const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');
const cartController = require('./../controllers/cart');
const orderController = require('./../controllers/order');
const router = express.Router();

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);

router.get('/cart', cartController.getCart);
router.post('/cart', cartController.postCart);
router.post('/cart-delete-item', cartController.deleteItemCart);

router.post('/create-order', orderController.postOrder);
router.get('/orders', orderController.getOrders);


module.exports = router;