const repo = require('../../database/productRepository');

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function getProducts(ctx) {
    try {
        const { limit, sort } = ctx.query;
        const products = repo.getProducts(limit, sort);

        ctx.status = 200;
        ctx.body = {
            data: products
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function createProduct(ctx) {
    try {
        const data = ctx.request.body;
        const newProduct = repo.addProduct(data);

        ctx.status = 201;
        return ctx.body = {
            success: true,
            data: newProduct
        };
    } catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function updateProduct(ctx) {
    try {
        const { id } = ctx.params;
        const newData = ctx.request.body;
        repo.updateProduct(id, newData);
        ctx.status = 200;
        return ctx.body = {
            success: true,
            message: "Product updated successfully",
        };
    } catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function deleteProduct(ctx) {
    try {
        const { id } = ctx.params;
        repo.deleteProduct(id);

        ctx.status = 200;
        return ctx.body = {
            success: true,
            message: "Product deleted"
        };
    } catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function getProduct(ctx) {
    try {
        const {id} = ctx.params;
        let product = repo.getProduct(id);

        const {fields} = ctx.query;
        if (fields) {
            product = repo.getProductFields(product, fields)
        }

        ctx.status = 200;
        return ctx.body = {
            data: product
        };
    } catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}


module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct
};