const fs = require('fs');
const path = require('path');

const storagePath = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id, productPrice){
        // Fetch previous cart items
        fs.readFile(storagePath, (err, fileContent) => {
            let cart = {
                products: [],
                totalPrice: 0
            }
            if(!err){
                cart = JSON.parse(fileContent);
            }

            // Analyze the cart, Find existing product
            const existingProductIndex = cart.products.findIndex(
                prod => prod.id === id
            );

            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            // Add new product, increase quantity
            if(existingProduct){
                updatedProduct = { ...existingProduct }
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct
            }else{
                updatedProduct = { id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice + productPrice;
            fs.writeFile(storagePath, JSON.stringify(cart), err => {
                console.log(err)
            })

        })
    }


    static deleteProduct(id, productPrice) {
        fs.readFile(storagePath, (err, fileContent) => {
            if(err){
                return;
            }
            const updateCart = { ...JSON.parse(fileContent) };
            const product = updateCart.products.find(
                prod => prod.id === id
            );
            if(!product){
                return;
            }

            const productQty = product.qty;
            updateCart.products.filter(
                prod => prod.id !== id
            );

            updateCart.totalPrice = updateCart.totalPrice - productPrice * productQty;
            fs.writeFile(storagePath, JSON.stringify(updateCart), err => {
                console.log(err)
            })
        })
    }

    static getCart(cb){
        fs.readFile(storagePath, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if(err){
                cb(null);
            }else{
                cb(cart);
            }
        })
    }

}