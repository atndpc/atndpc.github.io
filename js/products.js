document.addEventListener("DOMContentLoaded", function () {
    // Product data
    const products = [
        { name: "Ballon Pants", category: "pants", price: 790, pic: "product-balloon-1.jpeg", id: "addBalloon" },
        { name: "Parachute Pants", category: "pants", price: 790, pic: "product-cargo-2.jpeg", id: "addCargo" },
        { name: "Short Pants", category: "shorts", price: 450, pic: "product-short-1.jpeg", id: "addShort" },
        { name: "T-Shirt SMK", category: "tshirt", price: 460, pic: "product-tshirt-cartoon-1.jpeg", id: "addTsSmk" },
        { name: "T-Shirt LS", category: "tshirt", price: 460, pic: "product-tshirt-neon-1.jpeg", id: "addTsLs" },
        { name: "T-Shirt SKT", category: "tshirt", price: 460, pic: "product-tshirt-twotone-1.jpeg", id: "addTsSkt" }
    ];

    // Display products
    const productsDisplay = document.getElementById("productsDisplay");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const categoryFilter = document.getElementById("categoryFilter");

    renderProducts(products);

    // Filter and search
    searchButton.addEventListener("click", function () {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = filterProducts(products, searchTerm, categoryFilter.value);
        renderProducts(filteredProducts);
    });

    categoryFilter.addEventListener("change", function () {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = filterProducts(products, searchTerm, categoryFilter.value);
        renderProducts(filteredProducts);
    });

    function filterProducts(productsToFilter, searchTerm, category) {
        return productsToFilter.filter(product =>
            (product.name.toLowerCase().includes(searchTerm) || searchTerm === "") &&
            (product.category === category || category === "")
        );
    }

    // Render products
    function renderProducts(productsToRender) {
        productsDisplay.innerHTML = "";
        productsToRender.forEach(product => {
            const productCard = createProductCard(product);
            productsDisplay.appendChild(productCard);

            // Add event listener for each "Add to Cart" button after rendering
            const addToCartButton = document.getElementById(product.id);
            addToCartButton.addEventListener("click", function () {
                addProduct(product.name, product.price, 1, product.pic);
            });
        });
    }

    function createProductCard(product) {
        const card = document.createElement("div");
        card.className = "col-6 col-md-4 mb-3";
        card.innerHTML = `
            <div class="card bg-light border border-secondary-subtle border-2 rounded-4">
                <div class="card-body">
                    <img src="./src/${product.pic}" class="card-img-top mb-3" alt="${product.name}">
                    <p class="card-title fs-6 fs-md-5 fw-bold">${product.name}</p>
                    <p class="card-text">฿${product.price}</p>
                    <button class="btn btn-outline-primary" id="${product.id}">Add to cart</button>
                </div>
            </div>
        `;
        return card;
    }

    // Add product to cart
    function addProduct(name, price, quantity, pic) {
        const product = {
            name: name,
            price: price,
            quantity: quantity,
            pic: pic
        };

        saveProduct(product);
    }

    function saveProduct(product) {
        const products = getStoredProducts(); /* Get the existing products */

        // Check if the product is already in the array
        const isProductExist = products.some(existingProduct => existingProduct.name.toLowerCase() === product.name.toLowerCase());

        if (!isProductExist) {
            products.push(product);
            localStorage.setItem("products", JSON.stringify(products));
            const cartNumber = products.length;
            cart.innerHTML = cartNumber;
            localStorage.setItem("productCount", cartNumber);
            //return true; // Product was successfully saved
        } else {
            //return false; // Product already exists
        }
    }

    function getStoredProducts() {
        const products = localStorage.getItem("products");
        if (products) {
            return JSON.parse(products);
        } else {
            return [];
        }
    }
});