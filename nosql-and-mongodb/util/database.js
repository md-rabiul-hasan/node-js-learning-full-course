const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = cb => {
    MongoClient.connect('mongodb+srv://mdrabiulhasan:zWuaHSpsq4MjFHkc@nodejslearning.yr5egud.mongodb.net/node_js_learning?retryWrites=true&w=majority')
    .then(client => {
        _db = client.db();
        cb();
    })
    .catch(err => {
        console.log('db crror', err);
    })
}

const getDb = () => {
    if(_db){
        return _db;
    }
   throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;