const Product = require("./../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
}

exports.postAddProduct = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body;
    req.user.createProduct({
        title,
        price,
        imageUrl,
        description
    })
        .then(result => {
            console.log('result', result);
            res.redirect("/admin/products");
        })
        .catch(err => {
            console.log(err);
        })
}


exports.getProducts = (req, res, next) => {
    req.user.getProducts()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Product',
                path: '/admin/products'
            })
        })
        .catch(err => {
            console.log(err);
        })
}


exports.getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    req.user.getProducts({
        where: { id: productId }
    })
        .then(products => {
            const product = products[0];
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                product: product
            })
        })
}

exports.updateProduct = (req, res, next) => {
    const { productId, title, price, imageUrl, description } = req.body;
    Product.findById(productId)
        .then(product => {
            product.title = title;
            product.price = price;
            product.imageUrl = imageUrl;
            product.description = description;
            return product.save();
        })
        .then(result => {
            console.log('product udpate');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err))
}


exports.deleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.destroy({
            where: { id: productId }
        })
        .then(result => {
            console.log('deleted done');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        })
}