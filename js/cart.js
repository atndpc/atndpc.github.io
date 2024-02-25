document.addEventListener("DOMContentLoaded", function() {
    // Display products on cart and summary total price
    const productsContainer = document.getElementById("productsContainer");
    const totalPrice = document.getElementById("total-price");
    productsContainer.addEventListener("click", handleProductActions)

    loadProducts();

    function loadProducts() {
        const products = getStoredProducts();
        let price = 0;
        productsContainer.innerHTML = "";
        for (const product of products) {
            displayProduct(product);
            price = price + (product.price * product.quantity);
        }
        totalPrice.innerHTML = price;
    }

    function getStoredProducts() {
        const products = localStorage.getItem("products");
        if (products) {
            return JSON.parse(products);
        } else {
            return [];
        }
    }

    function displayProduct(product) {
        const productElement = `
        <div class="product row align-items-center justify-content-center" data-name="${product.name}">
            <div class="col-8 col-md-4 p-3 mt-3 bg-light border border-secondary-subtle border-2 rounded-4">
                <div class="row align-items-center">
                    <div class="col-4">
                        <img src="./src/${product.pic}" class="card-img-top" alt="${product.name}">
                    </div>
                    <div class="col-8">
                        <p>Name: ${product.name}</p>
                        <p>Price: ${product.price}</p>
                        <div class="product-actions">
                            <div>
                                <span class="add btn btn-outline-primary btn-sm">+</span>
                                <span class="quantity">${product.quantity}</span>
                                <span class="subtract btn btn-outline-primary btn-sm">-</span>
                                <span class="delete btn btn-outline-danger btn-sm">Delete</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        productsContainer.insertAdjacentHTML("beforeend", productElement);
    }

    // Product operations (add, subtract, delete)
    function handleProductActions(event) {
        const target = event.target;
        const productElement = target.closest(".product");
        const name = String(productElement.dataset.name);
    
        if (target.classList.contains("add")) {
            addProduct(name);
        } else if (target.classList.contains("subtract")) {
            subtractProduct(name);
        } else if (target.classList.contains("delete")) {
            deleteProduct(name);
            productElement.remove();
        }
    }

    function addProduct(name) {
        const products = getStoredProducts();
        const productIndex = products.findIndex(product => product.name === name);
        products[productIndex].quantity += 1;
    
        const productQuantity = document.querySelector(`[data-name="${name}"] .quantity`);
        productQuantity.textContent = `${products[productIndex].quantity}`;
    
        localStorage.setItem("products", JSON.stringify(products));
        loadProducts();
    }
    
    function subtractProduct(name) {
        const products = getStoredProducts();
        const productIndex = products.findIndex(product => product.name === name);
        if (products[productIndex].quantity > 1) {
            products[productIndex].quantity -= 1;
        }
    
        const productQuantity = document.querySelector(`[data-name="${name}"] .quantity`);
        productQuantity.textContent = `${products[productIndex].quantity}`;
    
        localStorage.setItem("products", JSON.stringify(products));
        loadProducts();
    }
    
    function deleteProduct(name) {
        let products = getStoredProducts();
        products = products.filter(product => product.name !== name);
        localStorage.setItem("products", JSON.stringify(products));
        const cartNumber = products.length;
        cart.innerHTML = cartNumber;
        localStorage.setItem("productCount", cartNumber);
        loadProducts();
    }
});