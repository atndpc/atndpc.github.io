const addBalloon = document.getElementById("addBalloon");
const addCargo = document.getElementById("addCargo");
const addShort = document.getElementById("addShort");
const addTsSmk = document.getElementById("addTsSmk");
const addTsLs = document.getElementById("addTsLs");
const addTsSkt = document.getElementById("addTsSkt");
const cart = document.getElementById("cart");

addBalloon.addEventListener("click", function () { addProduct("Balloon Pants", 790, 1); });
addCargo.addEventListener("click", function () { addProduct("Parachute Pants", 790, 1); });
addShort.addEventListener("click", function () { addProduct("Short Pants", 490, 1); });
addTsSmk.addEventListener("click", function () { addProduct("T-Shirt SMK", 490, 1); });
addTsLs.addEventListener("click", function () { addProduct("T-Shirt LS", 490, 1); });
addTsSkt.addEventListener("click", function () { addProduct("T-Shirt SKT", 490, 1); });

function addProduct(name, price, quantity) {
    const product = {
        name: name,
        price: price,
        quantity: quantity
    };

    saveProduct(product);

    // if (isProductSaved) {
    //     loadProducts();  // Load only if the product was successfully saved
    // }
}

function saveProduct(product) {
    const products = getStoredProducts(); /* Get the existing products */

    // Check if the product is already in the array
    const isProductExist = products.some(existingProduct => existingProduct.name.toLowerCase() === product.name.toLowerCase());
    
    if (!isProductExist) {
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
        const productCount = localStorage.getItem("productCount");
            if (productCount) {
                const cartNumber = parseInt(productCount, 10)+1;
                cart.innerHTML = cartNumber
                localStorage.setItem("productCount", cartNumber);
            } else {
                const cartNumber = 1;
                cart.innerHTML = cartNumber
                localStorage.setItem("productCount", cartNumber);
            }
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