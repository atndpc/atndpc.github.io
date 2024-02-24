// localStorage.clear();
document.addEventListener("DOMContentLoaded", function() {
    let productCount = localStorage.getItem("productCount")
    const cartMain = document.getElementById("cart");

    if (productCount > 0) {
        const cartNumber = parseInt(productCount, 10);
        cartMain.innerHTML = cartNumber
    } else {
        cartMain.innerHTML = 0
    }
});
