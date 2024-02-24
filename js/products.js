document.addEventListener("DOMContentLoaded", function() {
    // const searchInput = document.getElementById("searchInput");
    const productsDisplay = document.getElementById("productsDisplay");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const categoryFilter = document.getElementById("categoryFilter");

    // Mock data (replace this with your actual product data)
    const products = [
        { name: "Ballon Pants", category: "pants", price: 790, pic: "product-balloon-1.jpeg", id: "addBalloon" },
        { name: "Parachute Pants", category: "pants", price: 790, pic: "product-cargo-2.jpeg", id: "addCargo" },
        { name: "Short Pants", category: "shorts", price: 450, pic: "product-short-1.jpeg", id: "addShort" },
        { name: "T-Shirt SMK", category: "tshirt", price: 460, pic: "product-tshirt-cartoon-1.jpeg", id: "addTsSmk" },
        { name: "T-Shirt LS", category: "tshirt", price: 460, pic: "product-tshirt-neon-1.jpeg", id: "addTsLs" },
        { name: "T-Shirt SKT", category: "tshirt", price: 460, pic: "product-tshirt-twotone-1.jpeg", id: "addTsSkt" }        
    ];

    renderProducts(products);

    function createProductCard(product) {
        const card = document.createElement("div");
        card.className = "col-6 col-md-4 mb-3";
        card.innerHTML = `
            <div class="card">
                <img src="./src/${product.pic}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <p class="card-title fs-6 fs-md-5 fw-bold">${product.name}</p>
                    <p class="card-text">฿${product.price}</p>
                    <button class="btn btn-outline-secondary" id="${product.id}">Add to cart</button>
                </div>
            </div>
        `;
        return card;
    }

    searchButton.addEventListener("click", function() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = filterProducts(products, searchTerm, categoryFilter.value);
        renderProducts(filteredProducts);
    });

    categoryFilter.addEventListener("change", function() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = filterProducts(products, searchTerm, categoryFilter.value);
        renderProducts(filteredProducts);
    });

    function renderProducts(productsToRender) {
        productsDisplay.innerHTML = "";
        productsToRender.forEach(product => {
            const productCard = createProductCard(product);
            productsDisplay.appendChild(productCard);
        });
    }

    function filterProducts(productsToFilter, searchTerm, category) {
        return productsToFilter.filter(product =>
            (product.name.toLowerCase().includes(searchTerm) || searchTerm === "") &&
            (product.category === category || category === "")
        );
    }

    const addBalloon = document.getElementById("addBalloon");
    const addCargo = document.getElementById("addCargo");
    const addShort = document.getElementById("addShort");
    const addTsSmk = document.getElementById("addTsSmk");
    const addTsLs = document.getElementById("addTsLs");
    const addTsSkt = document.getElementById("addTsSkt");
    const cart = document.getElementById("cart");

    addBalloon.addEventListener("click", function () { addProduct("Balloon Pants", 790, 1, "product-balloon-1.jpeg"); });
    addCargo.addEventListener("click", function () { addProduct("Parachute Pants", 790, 1, "product-cargo-2.jpeg"); });
    addShort.addEventListener("click", function () { addProduct("Short Pants", 450, 1, "product-short-1.jpeg"); });
    addTsSmk.addEventListener("click", function () { addProduct("T-Shirt SMK", 460, 1, "product-tshirt-cartoon-1.jpeg"); });
    addTsLs.addEventListener("click", function () { addProduct("T-Shirt LS", 460, 1, "product-tshirt-neon-1.jpeg"); });
    addTsSkt.addEventListener("click", function () { addProduct("T-Shirt SKT", 460, 1, "product-tshirt-twotone-1.jpeg"); });

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