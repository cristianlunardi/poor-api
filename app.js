const express = require('express'); 
const { randomUUID } = require('crypto');
const app = express(); 
const port = 8080;

app.use(express.json());

const products = [];

app.post('/product', (req, res) => {

    const { name, price } = req.body;

    const product = {
        name,
        price,
        id: randomUUID() 
    };

    products.push(product);

    return res.json({ message: "Product added successfully!"});
});

app.get('/products', (req, res) => {
    return res.json(products);
});

app.get('/product/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find((products) => products.id === id);
    return res.json(product);
});

app.put('/products', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    const productIndex = products.findIndex(product => product.id === id);
    products[productIndex] = {
        ...products[productIndex],
        name,
        price
    };

    return res.json({ message: "Product has been modified!" });
});

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    
    const productIndex = products.find(product => product.id === id);

    products.splice(productIndex, 1);

    return res.json({ message: "Product has been deleted!"});
})

app.listen(port, () => console.log(`listening on port http://localhost:${port}`));

