document.addEventListener("DOMContentLoaded", function() {
    // Summary products and total price
    loadProducts();
    function loadProducts() {
        const products = getStoredProducts();
        let price = 0;
        const orderSummary = document.getElementById("orderSummary");

        orderSummary.innerHTML = `<p class="fs-3 fw-bold">Order Summary</p>`;
    
        for (const product of products) {
            price += product.price * product.quantity;
            const productElement = `
                    <p>Name: ${product.name}</p>
                    <p>Price: ${product.price} x ${product.quantity}</p>
                    `;
            orderSummary.innerHTML += productElement;
        }
        orderSummary.innerHTML += `<p class="fs-5 fw-bold">Total Price: ${price}</p>`;
    }

    function getStoredProducts() {
        const products = localStorage.getItem("products");
        return products ? JSON.parse(products) : [];
    }

    // Form submission
    const checkoutForm = document.getElementById("checkoutForm");
    checkoutForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
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

        // Reset form and local storage
        if (userConfirmation) {
            checkoutForm.reset();
            localStorage.clear();
            alert("Thank you for your purchase!");
            window.location.href = "index.html";
        }
    });
});
