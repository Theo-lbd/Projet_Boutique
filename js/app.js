import { products } from './products.js';

// Sélectionne le conteneur des produits
const productsContainer = document.getElementById('productsContainer');

// Fonction pour afficher les produits d'une catégorie spécifique
function displayProducts(category) {
    // Vider le conteneur produits
    productsContainer.innerHTML = '';

    if (!products[category]) {
        productsContainer.innerHTML = '<p>Aucun produit trouvé pour cette catégorie.</p>';
        return;
    }

    // Boucle parcour produit
    products[category].forEach(product => {
        // Créer une div pour chaque produit
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        
        productDiv.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.altTxt}" class="img_product">
            <h2 class="title_product">${product.name}</h2>
            <p class="price_product">Prix : ${product.price}€</p>
            <button onclick="addToCart('${product._id}')" class="addToCart">Ajouter au panier</button>
        `;
        
        // Ajoute produit
        productsContainer.appendChild(productDiv);
    });
}

// Fonction pour ajouter au panier
function addToCart(productId) {
    alert(`Le produit avec l'ID ${productId} a été ajouté au panier.`);
}

displayProducts('tv');
window.displayProducts = displayProducts;

