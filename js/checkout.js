// Function to load and display products and total price
function loadProducts() {
    const products = getStoredProducts();
    let price = 0;
    const orderSummary = document.getElementById("orderSummary");

    // Clear previous content
    orderSummary.innerHTML = `<p class="fs-3 fw-bold">Order Summary</p>`;

    // Display each product
    for (const product of products) {
        price += product.price * product.quantity;
        const productElement = `
                <p>Name: ${product.name}</p>
                <p>Price: ${product.price} x ${product.quantity}</p>
                `;
        orderSummary.innerHTML += productElement;
    }

    // Display total price
    orderSummary.innerHTML += `<p class="fs-5 fw-bold">Total Price: ${price}</p>`;
}

// Function to get stored products from localStorage
function getStoredProducts() {
    const products = localStorage.getItem("products");
    return products ? JSON.parse(products) : [];
}

// Load products when the page is loaded
window.addEventListener("DOMContentLoaded", loadProducts);

// Handle form submission
const checkoutForm = document.getElementById("checkoutForm");
checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');

    // if (selectedPaymentMethod) {
        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;
        const email = document.getElementById("email").value;

        const confirmationMessage = `
            Name: ${name}
            Address: ${address}
            Email: ${email}
            Payment Method: ${selectedPaymentMethod.value}
            
            Confirm submission?
        `;

        const userConfirmation = window.confirm(confirmationMessage);

        if (userConfirmation) {
            checkoutForm.reset();
            localStorage.clear();
            alert("Thank you for your purchase!");
            window.location.href = "index.html";
        }
    // } else {
    //     alert("Please select a payment method.");
    // }
});

