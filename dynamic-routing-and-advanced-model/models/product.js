const fs = require('fs');
const path = require('path');
const Cart = require("./cart");

const storagePath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = cb => {
    fs.readFile(storagePath, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    })
}

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(
                    prod => prod.id === this.id
                );
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(storagePath, JSON.stringify(updatedProducts), err => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(storagePath, JSON.stringify(products), err => {
                    console.log(err);
                });
            }
        })
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(
                prod => prod.id === id
            );
            const updatedProduct = products.filter(prod => prod.id !== id);
            fs.writeFile(storagePath, JSON.stringify(updatedProduct), err => {
                if(!err){
                    Cart.deleteProduct(id, product.price);
                }
            })
        })
    }

    static fetchAll(cb){
        getProductsFromFile(cb);
    }

    static findById(id, cb){
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id ===id);
            cb(product);
        })
    }

}