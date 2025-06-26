const fs = require('fs');
let productsData = require('./products.json');
const filePath = './src/database/products.json'

function getAllProducts() {
    return productsData;
}
function getProducts(limit, sort) {
    let result = productsData;
    if (sort === 'asc') {
        result = [...result].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sort === 'desc') {
        result = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (limit) {
        result = result.slice(0, parseInt(limit));
    }

    return result;
}

/**
 * @param data
 */
function addProduct(data) {
    const newProduct = {
        id: productsData.length ? productsData[productsData.length - 1].id + 1 : 1,
        ...data,
        createdAt: new Date().toISOString(),
    }

    const products = [...productsData, newProduct];
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

    return newProduct;
}

/**
 * @param id
 * @param newData
 */
function updateProduct(id, newData) {
    const readProducts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const updateProducts = readProducts.map((product) => {
        if (product.id === parseInt(id)) {
            return {
                ...product,
                newData
            }
        }
        return product;
    })

    fs.writeFileSync('./src/database/products.json', JSON.stringify(updateProducts, null, 2));
}

/**
 * @param id
 */
function deleteProduct(id) {
    const readProducts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const products = readProducts.filter(product => product.id !== parseInt(id));
    return fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
}

/**
 * @param id
 */
function getProduct(id) {
    return productsData.find(product => product.id === parseInt(id));
}

/**
 * @param product
 * @param fields
 */
function getProductFields(product, fields) {
    const pickList = fields
        .split(',')
        .map(f => f.trim());

    const productFields = {};
    pickList.forEach(key => {
        if (key in product) productFields[key] = product[key];
    });

    return productFields;
}

module.exports = {
    getProducts,
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getProductFields
};