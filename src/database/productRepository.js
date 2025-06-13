const fs = require('fs');
let productsData = require('./products.json');

function getProducts() {
    return productsData;
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

    productsData.push(newProduct);

    fs.writeFileSync('./src/database/products.json', JSON.stringify(productsData, null, 2));

    return newProduct;
}

/**
 * @param id
 * @param newData
 */
function updateProduct(id, newData) {
    const index = productsData.findIndex(product => product.id === parseInt(id));
    productsData[index] = { ...productsData[index], ...newData };

    fs.writeFileSync('./src/database/products.json', JSON.stringify(productsData, null, 2));
    return productsData[index];
}

/**
 * @param id
 */
function deleteProduct(id) {
    productsData = productsData.filter(product => product.id !== parseInt(id));
    fs.writeFileSync('./src/database/products.json', JSON.stringify(productsData, null, 2));
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
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getProductFields
};