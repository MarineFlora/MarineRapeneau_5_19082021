// récupération orderId
const orderIdRestored = localStorage.getItem("orderId");
console.log(orderIdRestored);

//récupération prix total
const totalPriceRestored = localStorage.getItem("totalPrice");
console.log(totalPriceRestored);

// récupération de la quantité
const totalQuantity = localStorage.getItem("totalQuantity");


//----------------------------------- affiche n° order et prix total + vide panier -----------------------------------//
//----------------------------------- onload sur <body> confirmation.html
function loadOrderInfo() {
    if (orderIdRestored) {
        document.getElementById("order-info").innerHTML = ` <p>Nombre d'articles commandés : <strong>${totalQuantity}</strong></p>
                                                            <p>Montant total de votre commande : <strong>${totalPriceRestored} €</strong></p>
                                                            <p>Commande n° : <strong>${orderIdRestored}</strong></p>`
        localStorage.clear(); 
    } 
    // si commande non passée, renvoi à la page panier
    else {
        document.location.href="cart.html";
    }
}
