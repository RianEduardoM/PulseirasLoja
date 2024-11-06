document.addEventListener('DOMContentLoaded', () => {
    let testResults = {
        addProduct: '',
        editProduct: '',
        deleteProduct: '',
        addToCart: '',
        viewCart: '',
        sales: ''
    };

    // Função para carregar a lista de produtos no painel admin
    const loadProducts = () => {
        const productList = document.getElementById('product-list-admin');
        let products = JSON.parse(localStorage.getItem('products') || '[]');
        productList.innerHTML = '';

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product-item';
            productDiv.innerHTML = `
                <span>${product.name} - R$ ${product.price.toFixed(2)}</span>
                <button onclick="editProduct(${product.id})">Editar</button>
                <button onclick="deleteProduct(${product.id})">Excluir</button>
            `;
            productList.appendChild(productDiv);
        });
    };

    // Função para adicionar produto
    window.testAddProduct = () => {
        const newProduct = {
            id: Date.now(),
            name: 'Pulseira Teste',
            price: 19.99
        };

        let products = JSON.parse(localStorage.getItem('products') || '[]');
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));

        testResults.addProduct = `Produto Adicionado: ${newProduct.name}`;
        loadProducts();
        updateTestReport();
    };

    // Função para editar um produto
    window.editProduct = (id) => {
        let products = JSON.parse(localStorage.getItem('products') || '[]');
        const product = products.find(p => p.id === id);

        if (product) {
            product.name = prompt('Novo nome do produto:', product.name) || product.name;
            product.price = parseFloat(prompt('Novo preço do produto:', product.price.toFixed(2))) || product.price;

            localStorage.setItem('products', JSON.stringify(products));
            testResults.editProduct = `Produto Editado: ${product.name}`;
            loadProducts();
            updateTestReport();
        }
    };

    // Função para excluir um produto
    window.deleteProduct = (id) => {
        let products = JSON.parse(localStorage.getItem('products') || '[]');
        const newProducts = products.filter(p => p.id !== id);

        localStorage.setItem('products', JSON.stringify(newProducts));

        testResults.deleteProduct = 'Produto Excluído!';
        loadProducts();
        updateTestReport();
    };

    // Função para simular a venda
    window.testSales = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const total = cart.reduce((acc, item) => acc + item.price, 0);
        testResults.sales = `Venda Simulada! Total: R$ ${total.toFixed(2)}`;
        alert(testResults.sales);
        updateTestReport();
    };

    // Função para adicionar produto ao carrinho
    window.testAddToCart = () => {
        const product = {
            id: Date.now(),
            name: 'Pulseira Teste Carrinho',
            price: 29.99
        };

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));

        testResults.addToCart = 'Produto Adicionado ao Carrinho!';
        updateTestReport();
    };

    // Função para visualizar carrinho
    window.testViewCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        testResults.viewCart = `Carrinho Visualizado: ${cart.length} itens`;
        alert(testResults.viewCart);
        updateTestReport();
    };

    // Função para atualizar o relatório de testes
    const updateTestReport = () => {
        const reportText = `
            Relatório de Testes:
            - Produto Adicionado: ${testResults.addProduct}
            - Produto Editado: ${testResults.editProduct}
            - Produto Excluído: ${testResults.deleteProduct}
            - Produto Adicionado ao Carrinho: ${testResults.addToCart}
            - Carrinho Visualizado: ${testResults.viewCart}
            - Simulação de Venda: ${testResults.sales}
        `;
        document.getElementById('test-report').value = reportText;
    };

    // Função para enviar o relatório
    window.sendReport = () => {
        alert('Relatório Enviado!');
        // Lógica para enviar os dados para um servidor pode ser inserida aqui
    };

    // Inicializar os produtos no painel admin
    loadProducts();
});
