const Router = require('koa-router');

const productHandler = require('../handlers/products/productHandlers');
const productInputMiddleware = require('../middleware/productInputMiddleware.js');

// Prefix all routes with /books
// const router = new Router({
//     prefix: '/api'
// });

const router = new Router();

const { getAllProducts: getAllProducts } = require('../database/productRepository');

//Routes products
router.get('/api/products', productHandler.getProducts);
router.post('/api/products', productInputMiddleware, productHandler.createProduct);
router.put('/api/product/:id', productInputMiddleware, productHandler.updateProduct);
router.delete('/api/product/:id', productHandler.deleteProduct);
router.get('/api/product/:id', productHandler.getProduct);

router.get('/products', async (ctx) => {
    const products = getAllProducts();
    await ctx.render('pages/product', {
        products
    });
});

module.exports = router;
