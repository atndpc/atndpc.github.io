document.addEventListener("DOMContentLoaded", function() {
    // Load products on cart
    let productCount = localStorage.getItem("productCount")
    const cartMain = document.getElementById("cart");

    if (productCount > 0) {
        const cartNumber = parseInt(productCount, 10);
        cartMain.innerHTML = cartNumber
    } else {
        cartMain.innerHTML = 0
    }
});
