document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Product 1', price: 10.99 },
        { id: 2, name: 'Product 2', price: 19.99 },
        { id: 3, name: 'Product 3', price: 49.99 },
        { id: 4, name: 'Product 4', price: 15.99 },
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const emptyCartMessage = document.getElementById('empty-cart');
    const totalPriceDisplay = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function renderProducts() {
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <span>${product.name} - $${product.price.toFixed(2)}</span>
                <button data-id="${product.id}">Add to Cart</button>
            `;
            productList.appendChild(productDiv);
        });
    }

    productList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            addToCart(product);
        }
    });

    function addToCart(product) {
        cart.push(product);
        saveCart();
        renderCart();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        saveCart();
        renderCart();
    }

    function renderCart() {
        cartItems.innerHTML = "";
        let totalPrice = 0;

        if (cart.length > 0) {
            emptyCartMessage.classList.add('hidden');
            cartTotal.classList.remove('hidden');

            cart.forEach((item, index) => {
                totalPrice += item.price;
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <span>${item.name} - $${item.price.toFixed(2)}</span>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                `;
                cartItems.appendChild(cartItem);
            });

            totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
        } else {
            emptyCartMessage.classList.remove('hidden');
            cartTotal.classList.add('hidden');
            totalPriceDisplay.textContent = `$0.00`;
        }
    }

    checkoutBtn.addEventListener('click', () => {
        cart = [];
        saveCart();
        alert("Your order is placed successfully!");
        renderCart();
    });

    window.removeFromCart = removeFromCart; // Expose function to global scope
    renderProducts();
    renderCart();
});
