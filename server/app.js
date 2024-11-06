const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('client'));
app.use('/admin', express.static('admin'));

// Simulação de banco de dados
const loadProducts = () => {
    const data = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
    return JSON.parse(data).products;
};

const saveProducts = (products) => {
    fs.writeFileSync(
        path.join(__dirname, 'data.json'),
        JSON.stringify({ products }, null, 2)
    );
};

// Rota para listar produtos
app.get('/api/products', (req, res) => {
    const products = loadProducts();
    res.json(products);
});

// Rota para adicionar produto
app.post('/api/products', (req, res) => {
    const products = loadProducts();
    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        name: req.body.name,
        price: req.body.price
    };
    products.push(newProduct);
    saveProducts(products);
    res.status(201).json(newProduct);
});

// Rota para editar produto
app.put('/api/products/:id', (req, res) => {
    let products = loadProducts();
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...req.body };
        saveProducts(products);
        res.json(products[productIndex]);
    } else {
        res.status(404).json({ message: "Produto não encontrado" });
    }
});

// Rota para deletar produto
app.delete('/api/products/:id', (req, res) => {
    let products = loadProducts();
    products = products.filter(product => product.id !== parseInt(req.params.id));
    saveProducts(products);
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
