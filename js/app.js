// Importation des produits
import { products } from './products.js';

// Gestion de l'affichage des catégories
document.getElementById('categorieToggle').addEventListener('click', () => {
    const menuList = document.getElementById('categorieList');
    menuList.classList.toggle('show');
});

// Ferme le menu après sélection
const categoryLinks = document.querySelectorAll('#categorieList button');
categoryLinks.forEach(link => {
    link.addEventListener('click', () => {
        const menuList = document.getElementById('categorieList');
        menuList.classList.remove('show'); 
    });
});


// Gestion du menu latéral pour le panier
const cartToggle = document.getElementById('cart-toggle');
const sideMenu = document.getElementById('side-menu');
const closeMenu = document.getElementById('close-menu');

// Ouvrir/Fermer le menu panier
cartToggle.addEventListener('click', () => {
    sideMenu.classList.toggle('open');
});

closeMenu.addEventListener('click', () => {
    sideMenu.classList.remove('open');
});

// Variables DOM pour l'affichage des produits et du panier
const productsContainer = document.getElementById('productsContainer');
const categoryTitle = document.getElementById('categoryTitle');
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

let cart = [];

// Fonction pour afficher les produits d'une catégorie
function displayProducts(category) {
    productsContainer.innerHTML = ''; // Réinitialisation du conteneur

    if (!products[category]) {
        productsContainer.innerHTML = '<p>Aucun produit trouvé pour cette catégorie.</p>';
        return;
    }

    categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);

    // Boucle à travers les produits de la catégorie
    products[category].forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.altTxt}" class="img_product">
            <h2 class="title_product">${product.name}</h2>
            <p class="price_product">Prix : ${product.price}€</p>
            <input type="number" id="quantity-${product._id}" min="1" value="1" class="quantity-input">
            <button onclick="addToCart('${product._id}', '${category}')" class="addToCart">Ajouter au panier</button>
        `;
        productsContainer.appendChild(productDiv);
    });
}

// Mettre à jour le nombre d'articles dans le panier
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;

    if (cart.length > 0) {
        cartCount.style.display = 'block';
    } else {
        cartCount.style.display = 'none';
    }
}

// Ajouter un produit au panier
function addToCart(productId, category) {
    const product = products[category].find(prod => prod._id === productId);
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value);

    if (product && quantity > 0) {
        for (let i = 0; i < quantity; i++) {
            cart.push(product);
        }
        displayCartItems();
        updateCartCount();
    }
}

// Supprimer un produit du panier
function removeFromCart(productId) {
    const productIndex = cart.findIndex(item => item._id === productId);

    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
    }

    displayCartItems();
    updateCartCount();
}

// Calculer le total du panier
function calculateTotal() {
    let total = 0;
    cart.forEach(item => {
        total += item.price;
    });
    totalPriceElement.textContent = total.toFixed(2);
}

// Vider le panier
function clearCart() {
    cart = [];
    displayCartItems();
    updateCartCount();
}

// Gestion du bouton pour vider le panier
document.getElementById('clear-cart').addEventListener('click', clearCart);

// Afficher les articles dans le panier
function displayCartItems() {
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Votre panier est vide.</p>';
        totalPriceElement.textContent = '0';
        return;
    }

    const cartSummary = {};

    // Compter la quantité de chaque produit dans le panier
    cart.forEach(item => {
        if (cartSummary[item._id]) {
            cartSummary[item._id].quantity += 1;
        } else {
            cartSummary[item._id] = { ...item, quantity: 1 };
        }
    });

    // Afficher chaque produit avec sa quantité
    Object.values(cartSummary).forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart_product">
                <img src="${item.imageUrl}" alt="${item.altTxt}" class="img_product_cart">
                <h3 class="h3_cart">${item.name} (x${item.quantity})</h3>
                <p>Prix : ${item.price}€</p>
            </div>
            <div class="btn_remove_cart">
                <button class="remove-btn" onclick="removeFromCart('${item._id}')">Supprimer</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    calculateTotal();
}

// Initialiser l'affichage des produits de la catégorie 'tv'
displayProducts('tv');

// Rendre certaines fonctions accessibles globalement
window.displayProducts = displayProducts;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
