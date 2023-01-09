const fs   = require('fs');
const path = require('path');

const storagePath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = cb => {
    fs.readFile(storagePath, (err, fileContent) => {
        if(err){
            cb([]);
        }else{
            cb(JSON.parse(fileContent));
        }
    })
}

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title       = title;
        this.imageUrl    = imageUrl;
        this.description = description;
        this.price       = price;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(storagePath, JSON.stringify(products), err => {
                console.log(err)
            })
        })
    }

    static fetchAll(cb){
        getProductsFromFile(cb);
    }

}