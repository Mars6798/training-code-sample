const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker');

const products = [];

for (let i = 1; i <= 1000; i++) {
    products.push({
        id: i,
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price({ min: 5, max: 500 })),
        description: faker.commerce.productDescription(),
        product: faker.commerce.product(),
        color: faker.color.human(),
        createdAt: faker.date.past().toISOString(),
        image: faker.image.urlPicsumPhotos({ width: 300, height: 300 })
    });
}

const filePath = path.join(__dirname, '../src/database/products.json');
fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');

