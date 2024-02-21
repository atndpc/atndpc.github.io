const cartMain = document.getElementById("cart");
document.addEventListener("DOMContentLoaded", function() {
    let productCount = localStorage.getItem("productCount")
    if (productCount) {
        const cartNumber = parseInt(productCount, 10);
        cartMain.innerHTML = cartNumber
        localStorage.setItem("productCount", cartNumber);
    } else {

    }
});
