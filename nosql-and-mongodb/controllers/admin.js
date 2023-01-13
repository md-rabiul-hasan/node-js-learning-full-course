const Product = require("./../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    })
}

exports.postAddProduct = (req, res, next) => {
    const { title, price, imageUrl, description } = req.body;
    const product = new Product(title, price, imageUrl, description, req.user._id);
    product.save()
        .then(result => {
            console.log('created product');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        })
}


exports.getEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            console.log(product);
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                product: product
            });
        })
        .catch(err => console.log(err));
}


exports.postEditProduct = (req, res, next) => {
    const { productId, title, price, imageUrl, description } = req.body;
    const product = new Product(title, price, imageUrl, description, req.user._id);
    product.update(productId)
        .then(result => {
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err));

}

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            })
        })
        .catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById(productId)
        .then(() => {
            console.log('Destory product');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
} 