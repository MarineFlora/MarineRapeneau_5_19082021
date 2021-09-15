// récupération du panier
let cartRestored = JSON.parse(localStorage.getItem("cart"));

function removeDisplayNone(element) {
    element.classList.remove("d-none");
  }


//----------------------------------- afficher le contenu de la page panier -----------------------------------//
function loadCart() { 
        if (cartRestored.length > 0) {
            // fait apparaitre les elements cachés de cart.html pour la panier plein : form, lien retour, titre
            const cartFullDisplay = document.querySelector(".cart-full-display");                                                     
            removeDisplayNone(cartFullDisplay);

            let cartElements = "";
            let totalPrice = 0;
            let totalQuantity = 0;
            // boucle pour chaque élement enregistré dans le local storage, ajouter cet html
            cartRestored.forEach(item => {
                totalPrice += item.price;
                totalQuantity += Number(item.quantity);
                localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
                console.log(totalQuantity);
                
                

                cartElements += ` <div class="col-sm-3 mb-2">
                                                                            <img id="product-img" class="camera-mini" src="${item.imageUrl}" alt="camera vintage ${item.name} " />
                                                                        </div>
                                                                        <div class="col-sm-3">
                                                                            <p class="mb-2">${item.name}</p>
                                                                        </div>
                                                                        <p class="col-sm-2 fw-bold mb-2 price-product" >${item.price} €</p>  
                                                                        <div class="col-md-2 mb-2 d-flex justify-content-center align-items-center">
                                                                            <input type="number" min="1" max="100" value="${item.quantity}"  id="${item._id}" class="form-control form-select-sm input-sm input-vh" onblur="priceUpdate(event, '${item._id}')" onchange="priceUpdate(event, '${item._id}')">
                                                                        </div>
                                                                        <a href="cart.html" class="col-md-2 mb-4" onclick="removeItem('${item._id}')">supprimer</a> `;
            });
            document.getElementById("cart-products").innerHTML = cartElements;
            document.getElementById("cart-title").innerHTML = `<h1> Mon panier (${totalQuantity} produits)</h1>`;
                                                        
            //affichage du prix total
            document.getElementById("cart-total").innerHTML = `
                                                                    
                                                                        <p class="col fw-bold text-center">TOTAL</p>
                                                                        <p class="col fw-bold text-center">${totalPrice} €</p>
                                                                    `;
            localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
            console.log(totalPrice);
        

        } else {
            const cartEmpty = document.getElementById("empty-cart");
            removeDisplayNone(cartEmpty);
        }
}


//----------------------------------- recalcul du prix si quantité modifiée-----------------------------------//
//----------------------------------- onblur + onchange sur input number de cart-products
   
function priceUpdate(event, itemId) {
    event.preventDefault();
    let input = document.getElementById(itemId);
    // on parcourt le localStorage pour récuperer le produit
    const product = cartRestored.find(item => item._id === itemId);
    // si quantité saisie négative, quantité = 1
    if (input.value <= 0) {
        input.value = 1;
      // si +100 saisie, quantité = 100 + message
    } else if (input.value > 100) {
       input.value = 100;
       alert("quantité maximale de 100");
    }
    // la quantité est un nombre, converti en entier positif si besoin
    const newQuantity = Math.abs(Number(input.value).toFixed());
    if (product) {
        console.log(product);
        // gestion du prix
        const prixUnitaire = Number(product.price)/Number(product.quantity);
        console.log(prixUnitaire);
        product.price = prixUnitaire*newQuantity;
        product.quantity = newQuantity;
    }
    console.log(cartRestored);
    // mise à jour du localStorage
    localStorage.setItem("cart", JSON.stringify(cartRestored));
    loadCart();
  }


//----------------------------------- supprimer un produit-----------------------------------//
//----------------------------------- onclick sur lien "supprimer" de cart-products

function removeItem(itemId) {
    // retourne un nouveau tableau contenant les élements du tableau d'origine qui n'ont pas le même Id que celui du click sur suppr
    const newCart = cartRestored.filter(product => product._id !== itemId);
    if (newCart) {
        // mise à jour du panier
        localStorage.setItem("cart", JSON.stringify(newCart)); 
    }
    loadCart();
} 


//----------------------------------- FORMULAIRE -----------------------------------//
// Validation des champs et envoi
// fonction base provenant de bootstrap, customisée
// dernier "();" = exécute immédiatement la fonction

(function formValidation() {
     // utilise Javascript en mode strict = semantique légèrement différente du "normal" (élimine certaines erreurs)
    'use strict'
    // Récupère le formulaire sur lequel ont veut appliquer la validation Bootstrap
    var form = document.querySelector('.needs-validation');
        // écoute du submit sur button
        form.addEventListener('submit', function (event) {
            // ajoute la class 'was-validated' = style pour in-validité
            form.classList.add('was-validated');
            // si champ invalide : empeche l'envoi du form
            if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            } 
            // sinon envoi la commande
            else {
              submitOrder(event);
            }
        });
  })();


//----------------------------------- Envoi panier + formulaire -----------------------------------//
//----------------------------------- appellée dans fonction formValidation()

function submitOrder(event) {
    event.preventDefault();

    // récupération des valeurs des input 
    const formData = new FormData(event.target);
    const lastName = formData.get('lastName');
    const firstName = formData.get('firstName');
    const address = formData.get('address');
    const addressComplement = formData.get('addressComplement');
    const city = formData.get('city');
    const zipCode = formData.get('zipCode');
    const email = formData.get('email');

    // envoi panier et contact
    if (cartRestored && cartRestored.length > 0) {
        // créer une instance de la classe Contact
        const contact = new Contact(lastName, firstName, address, addressComplement, city, zipCode, email);
        // recuperer id produits du panier
        const productId = [];
        cartRestored.forEach(product => { 
            productId.push(product._id)
        });
        console.log(productId);
        // creer commande
        const order = new Order(contact, productId);
        // envoi des données au back et recup orderId
        sendOrderData(order);

    } else {
        alert("Veuillez choisir un produit avant de valider votre commande");
      }
}

// requête POST pour envoi données
function sendOrderData(order){
    fetch("http://localhost:3000/api/cameras/order", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    })
   
    .then((response) => response.json())
    .then((response) => {
        // recuperation du numero de commande
        let orderId = response.orderId;
        console.log(orderId);
        localStorage.setItem("orderId", orderId);
        window.location = 'confirmation.html';
      })
    .catch(error => console.log(error)); 
}


