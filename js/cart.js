const productsContainer = document.getElementById("productsContainer");
loadProducts();

function loadProducts() {
    const products = getStoredProducts();
    let price = 0;
    productsContainer.innerHTML = "";
    for (const product of products) {
        displayProduct(product);
        price = price + (product.price * product.quantity);
    }
    const productElement = `
    <div class="row align-items-center justify-content-center">
        <div class="col-8 col-md-4 p-3 mt-3 text-center text-white bg-secondary rounded-4">
            <p>Total Price: ${price}</p>
            <div class="product-actions">
                <div>
                    <span class="checkout btn btn-primary btn-sm">Check Out</span>
                </div>
            </div>
        </div>
    </div>
    `;
    productsContainer.insertAdjacentHTML("beforeend", productElement);
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
    <div class="row align-items-center justify-content-center">
        <div class="col-8 col-md-4 p-3 mt-3 text-center bg-light border border-secondary-subtle border-2 rounded-4">
            <p>Name: ${product.name}</p>
            <p>Price: ${product.price}</p>
            <div class="product-actions">
                <div>
                    <span class="add btn btn-outline-primary btn-sm">+</span>
                    <span>${product.quantity}</span>
                    <span class="subtract btn btn-outline-primary btn-sm">-</span>
                    <span class="delete btn btn-outline-danger btn-sm">Delete</span>
                </div>
            </div>
        </div>
    </div>
    `;
    productsContainer.insertAdjacentHTML("beforeend", productElement);
}