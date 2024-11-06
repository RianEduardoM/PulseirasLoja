document.addEventListener('DOMContentLoaded', () => {

    // Função para carregar os produtos na loja
    const loadProducts = () => {
        const productList = document.getElementById('product-list');
        let products = JSON.parse(localStorage.getItem('products') || '[]');
        productList.innerHTML = '';

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product-item';
            productDiv.innerHTML = `
                <span>${product.name} - R$ ${product.price.toFixed(2)}</span>
                <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            `;
            productList.appendChild(productDiv);
        });
    };

    // Função para adicionar produto ao carrinho
    window.addToCart = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        let products = JSON.parse(localStorage.getItem('products') || '[]');
        const product = products.find(p => p.id === id);

        if (product) {
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Produto adicionado ao carrinho!');
        }
    };

    // Carregar os produtos na loja
    loadProducts();
});
