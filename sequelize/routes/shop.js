const path    = require('path');
const express = require('express');
const router  = express.Router();

const shopController = require('./../controllers/shop');

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.productShow);

router.get('/cart', shopController.getCart);
router.post('/cart', shopController.addToCart);
router.post('/cart-delete-item', shopController.deleteCartItem)


router.get('/orders', shopController.getOrders);
router.post('/create-order', shopController.postOrder);

module.exports = router;