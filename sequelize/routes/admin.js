const path    = require('path');
const express = require('express');
const app     = express();
const router  = express.Router();

const adminController = require("./../controllers/admin");

router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);

router.get('/products', adminController.getProducts);

router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product', adminController.updateProduct);

router.post('/delete-product', adminController.deleteProduct);

module.exports = router;