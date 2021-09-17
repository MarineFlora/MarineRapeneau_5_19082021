//----------------------------------- affiche n° order et prix total + vide panier -----------------------------------//
//----------------------------------- onload sur <body> confirmation.html
function loadOrderInfo() {
    // récupération orderId
    const orderIdRestored = localStorage.getItem("orderId");
    console.log(orderIdRestored);
    // récupération de la quantité
    const totalQuantity = localStorage.getItem("totalQuantity");
    //récupération prix total
    const totalPrice = localStorage.getItem("totalPrice");
    
    if (orderIdRestored) {
        document.getElementById("order-info").innerHTML = ` <p>Nombre d'articles commandés : <strong>${totalQuantity}</strong></p>
                                                            <p>Montant total de votre commande : <strong>${totalPrice} €</strong></p>
                                                            <p>Commande n° : <strong>${orderIdRestored}</strong></p>`
        localStorage.clear(); 
    } 
    // si commande non passée, renvoi à la page panier
    else {
        document.location.href="cart.html";
    }
}
