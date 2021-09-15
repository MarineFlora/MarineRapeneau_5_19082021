// ajout dynamique du nombre de produits sur l'icone panier du header

const cartIconNumber = document.querySelector(".cart-header__number");

function updateHeaderCart() {
    if (totalQuantity > 0) {
        cartIconNumber.innerHTML = `<p>${totalQuantity}</p>`
    } else {
        cartIconNumber.classList.add('d-none');
    }
}
