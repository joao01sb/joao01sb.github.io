// Variáveis globais
const products = [
    { id: 15, name: 'Assassin\'s Creed Valhalla', category: 'ACAO', price: 60, image: './imagensProdutos/Assassin_s_Creed_Valhalla.svg' },
    { id: 16, name: 'Assassin\'s Creed Valhalla (Xbox)', category: 'ACAO', price: 60, image: './imagensProdutos/Assassins-Creed-Valhalla_xbox.svg' },
    { id: 17, name: 'Death Stranding', category: 'AVENTURA', price: 50, image: './imagensProdutos/death_stranding.svg' },
    { id: 18, name: 'Disney Illusion Island', category: 'AVENTURA', price: 40, image: './imagensProdutos/Disney-Illusion-Island.svg' },
    { id: 19, name: 'EA Sports FC 24', category: 'ESPORTES', price: 70, image: './imagensProdutos/EA-Sports-FC-24.svg' },
    { id: 20, name: 'Final Fantasy Type-0 HD', category: 'RPG', price: 35, image: './imagensProdutos/Final-Fantasy-Type-0-Hd.svg' },
    { id: 21, name: 'Final Fantasy XII: The Zodiac Age', category: 'RPG', price: 40, image: './imagensProdutos/Final-Fantasy-Xii-The-Zodiac-Age.svg' },
    { id: 22, name: 'God of War Ragnarök', category: 'ACAO', price: 70, image: './imagensProdutos/God-of-War-Ragnar.svg' },
    { id: 23, name: 'Doki Doki Literature Club Plus', category: 'MOBA', price: 20, image: './imagensProdutos/Jogo-Doki-Doki-Literature-Club-Plus.svg' },
    { id: 24, name: 'Lego Os Incríveis', category: 'AVENTURA', price: 30, image: './imagensProdutos/Jogo-Lego-Os-Incr-veis.svg' },
    { id: 25, name: 'Mortal Kombat 11', category: 'LUTA', price: 45, image: './imagensProdutos/Mortal-Kombat-11.svg' },
    { id: 26, name: 'Red Dead Redemption II', category: 'ACAO', price: 65, image: './imagensProdutos/Red-Dead-Redemption-II.svg' },
    { id: 27, name: 'Spider-Man', category: 'ACAO', price: 60, image: './imagensProdutos/spider-man.svg' },
    { id: 28, name: 'Star Wars Jedi: Survivor', category: 'AVENTURA', price: 70, image: './imagensProdutos/Star-Wars-Jedi-Survivor.svg' },
    { id: 29, name: 'The Witcher 3: Wild Hunt', category: 'RPG', price: 50, image: './imagensProdutos/The-Witcher-3-Wild-Hunt.svg' },
    { id: 30, name: 'Watch Dogs', category: 'ACAO', price: 40, image: './imagensProdutos/Watch-Dogs.svg' },
];


function saveCart() {
    localStorage.setItem('cart', JSON.stringify(produtosSelecionados));
}
let produtosSelecionados = [];
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        produtosSelecionados = JSON.parse(storedCart);
    } else {
        produtosSelecionados = [];
    }
}

function changeBannerImage() {
    bannerImages.forEach(image => {
        image.classList.remove('active');
    });

    currentImageIndex++;
    if (currentImageIndex >= bannerImages.length) {
        currentImageIndex = 0;
    }

    bannerImages[currentImageIndex].classList.add('active');
}

setInterval(changeBannerImage, 2000); // Altera a cada 2 segundos

let cartCount = 0;

const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search');
const categoriesList = document.querySelector('.header_categories ul');
const cartItemsList = document.getElementById('cart-items');
const clearCartButton = document.getElementById('clear-cart');
const checkoutButton = document.getElementById('checkout');

// Mostrar produtos na página
function displayProducts(productsArray) {
    productList.innerHTML = '';
    productsArray.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product');
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}">
            <p>Categoria: ${product.category}</p>
            <p>Preço: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
        `;
        productList.appendChild(productItem);
    });
}
// Mostrar produtos no carrinho
// Função para exibir itens do carrinho na página
function displayCartItems() {
    cartItemsList.innerHTML = ''; // Limpa o conteúdo anterior

    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Recupera os itens do localStorage

    storedCartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Preço: $${item.price}</p>
        `;
        cartItemsList.appendChild(cartItem);
    });

    updateTotalPrice(); // Atualiza o preço total ao exibir os itens
}
// Atualizar contagem do carrinho e exibir o badge
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartCount; // Atualiza o texto do badge
    cartCountElement.style.display = cartCount > 0 ? 'block' : 'none'; // Exibe ou esconde o badge
}
// Adicionar produto ao carrinho
function addToCart(productId) {
    const productToAdd = products.find(product => product.id === productId);
    if (productToAdd) {
        produtosSelecionados.push(productToAdd);
        saveCart();
        cartCount++;
        updateCartCount();
        displayCartItems();
        showCart();
    }
}
// Limpar carrinho
function clearCart() {
    produtosSelecionados.length = 0;
    cartCount = 0;
    saveCart();
    updateCartCount();
    displayCartItems();
    hideCart();
}
// Mostrar carrinho
function showCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.style.display = 'block';
}
// Esconder carrinho
function hideCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.style.display = 'none';
}
// Inicializar página
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    cartCount = produtosSelecionados.length
    displayProducts(products);

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
        displayProducts(filteredProducts);
    });

    categoriesList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const selectedCategory = event.target.getAttribute('data-category');
            filterByCategory(selectedCategory);
        }
    });

    clearCartButton.addEventListener('click', clearCart);

    checkoutButton.addEventListener('click', () => {
        alert('Redirecionando para a tela de pagamento...');
    });
});
// Função para filtrar produtos por categoria
function filterByCategory(selectedCategory) {
    let filteredProducts = [];
    if (selectedCategory === 'TODAS') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.category === selectedCategory);
    }
    displayProducts(filteredProducts);
}
// Inicializar página de carrinho
document.addEventListener('DOMContentLoaded', () => {

    loadCart();
    cartCount = produtosSelecionados.length

    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const clearCartButton = document.getElementById('clear-cart');
    const checkoutButton = document.getElementById('checkout');
    const paymentMethodSelect = document.getElementById('payment-method');
    const discountCodeInput = document.getElementById('discount-code');

    function updateTotalPrice() {
        const totalPrice = produtosSelecionados.reduce((sum, item) => sum + item.price * item.quantity, 0);
        let preci = 0
        produtosSelecionados.forEach(item => {
            preci += item.price
        })
        totalPriceElement.textContent = `Preço Total: R$${preci.toFixed(2)}`;
    }

    // Função para agrupar itens por uma chave específica
    function groupBy(array, key) {
        return array.reduce((result, currentItem) => {
            // A chave do agrupamento
            const groupKey = currentItem[key];
            // Se a chave do agrupamento não existir no resultado, crie um novo array para ela
            if (!result[groupKey]) {
                result[groupKey] = [];
            }
            // Adiciona o item atual ao grupo correspondente
            result[groupKey].push(currentItem);
            return result;
        }, {});
    }

    function displayCartItems() {
        // Agrupa os produtos pelo id
        const groupedItems = groupBy(produtosSelecionados, 'id');

        // Limpa o container dos itens do carrinho
        cartItemsContainer.innerHTML = '';

        // Itera pelos produtos agrupados e cria os elementos de exibição
        Object.values(groupedItems).forEach(group => {
            const item = group[0];
            const quantity = group.length;
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Preço: R$${item.price.toFixed(2)}</p>
                <p>Quantidade: ${quantity}</p>
            </div>
        `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Atualiza o preço total
        updateTotalPrice(groupedItems);
    }


    window.addItem = function(id) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity++;
            saveCart();
            displayCartItems();
        }
    }

    window.removeItem = function(id) {
        const item = cart.find(item => item.id === id);
        if (item && item.quantity > 1) {
            item.quantity--;
            saveCart();
            displayCartItems();
        }
    }

    window.deleteItem = function(id) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        displayCartItems();
    }

    clearCartButton.addEventListener('click', () => {
        cart = [];
        produtosSelecionados = [];
        saveCart();
        displayCartItems();
    });

    checkoutButton.addEventListener('click', () => {
        if (produtosSelecionados.length !== 0) {
            cart = [];
            produtosSelecionados = [];
            saveCart();
            const paymentMethod = paymentMethodSelect.value;
            const message = `Pagamento realizado com ${paymentMethod}.`;
            alert(message);
            window.location.href = 'index.html'; // Redirecionar para a página inicial
        }
    });


    displayCartItems();

    // document.getElementById('clear-cart').addEventListener('click', clearCart);
    //
    // document.getElementById('checkout').addEventListener('click', () => {
    //     alert('Redirecionando para a tela de pagamento...');
    // });
});
