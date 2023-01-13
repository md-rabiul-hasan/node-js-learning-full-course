const mongodb = require('mongodb');
const { getDb } = require("./../util/database");
const ObjectId = mongodb.ObjectId;

class Product {
    constructor(title, price, imageUrl, description, userId) {
        this.title       = title;
        this.price       = price;
        this.imageUrl    = imageUrl;
        this.description = description;
        this.userId      = userId;
    }

    save() {
        const db = getDb();
        return db.collection('products')
            .insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            })
    }

    update(productId) {
        console.log(productId)
        const db = getDb();
        return db.collection('products')
            .updateOne(
                { _id: new ObjectId(productId) },
                { $set: this }
            )
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err)
            })
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products')
            .find()
            .toArray()
            .then(products => {
                console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static findById(productId) {
        const db = getDb();
        return db.collection('products')
            .find({ _id: new mongodb.ObjectId(productId) })
            .next()
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static deleteById(productId) {
        const db = getDb();
        return db.collection('products')
            .deleteOne({ id: new mongodb.ObjectId(productId) })
            .then(result => {
                console.log('Deleted');
            })
            .catch(err => {
                console.log(err);
            })
    }

}

module.exports = Product;