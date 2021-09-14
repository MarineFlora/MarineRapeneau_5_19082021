// récupération orderId
const orderIdRestored = localStorage.getItem("orderId");
console.log(orderIdRestored);

//récupération prix total
const totalPriceRestored = localStorage.getItem("totalPrice");
console.log(totalPriceRestored);

// affichage du n° order et prix total
function loadOrderInfo() {
    if (orderIdRestored) {
        document.getElementById("order-info").innerHTML = ` <p>Montant total de votre commande : <strong>${totalPriceRestored} €</strong></p>
                                                            <p>Commande n° : <strong>${orderIdRestored}</strong></p>`
    }
}

loadOrderInfo();
