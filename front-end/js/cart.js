//-----------------------------------récupération du panier-----------------------------------//
let cartRestored = JSON.parse(localStorage.getItem("cart"));
let totalPrice = 0;
let totalQuantity = 0;

// fonction pour afficher le contenu de la page panier et récuperer les elements selectionnés
function loadCart() { 
    if (cartRestored == null || cartRestored == 0) {
        document.getElementById("empty-cart").innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-basket2" viewBox="0 0 16 16">
                                                                <path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0v-2z"/>
                                                                <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6H2.163z"/>
                                                            </svg>
                                                            <h1 class="pt-3 fw-bold">Votre panier est vide</h1>
                                                            <a href="index.html" class="link-dark pt-3">Continuer mes achats</a>`; 
    }
    else {
        // boucle pour chaque élement enregistré dans le local storage, ajouter cet html
        cartRestored.forEach(item => {
            totalPrice += item.price;
            totalQuantity += Number(item.quantity);
            
            document.getElementById("continue-shopping").innerHTML = `  <div class="col pb-3">
                                                                            <a href="index.html" class="link-dark text-decoration-none">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                                                                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                                                                </svg>
                                                                        Continuer mes achats
                                                                            </a> 
                                                                        </div>
                                                                        <h1 class="pb-3 col"> Mon panier (${totalQuantity} produits)</h1>`;

            document.getElementById("cart-products").innerHTML += ` <div class="col-sm-3 mb-2">
                                                                        <img id="product-img" class="camera-mini" src="${item.imageUrl}" alt="camera vintage ${item.name} " />
                                                                    </div>
                                                                    <div class="col-sm-3">
                                                                        <p class="mb-2">${item.name}</p>
                                                                    </div>
                                                                    <p class="col-sm-2 fw-bold mb-2 price-product" >${item.price} €</p>  
                                                                    <div class="col-md-2 mb-2 d-flex justify-content-center align-items-center">
                                                                        <input type="number" min="1" max="100" value="${item.quantity}"  id="${item._id}" class="form-control form-select-sm input-sm input-vh" onblur="validateForm(event, '${item._id}')" onchange="validateForm(event, '${item._id}')">
                                                                    </div>
                                                                    <a href="cart.html" class="col-md-2 mb-4" onclick="removeItem('${item._id}')">supprimer</a> `;

            
          
        });
                                                    
        //affichage du prix total -- note : "valider panier" à mettre après le formulaire
        document.getElementById("cart-total").innerHTML = `<h2 class="row text-left pb-2">Récapitulatif</h2>
                                                                <div class="row bg-light p-3 justify-content-center rounded">
                                                                    <p class="col fw-bold text-center">TOTAL</p>
                                                                    <p class="col fw-bold text-center">${totalPrice} €</p>
                                                                </div>`;
    }
  
    
}

//-----------------------------------recalcul du prix si quantité modifiée-----------------------------------//
//----------------------------------- onblur + onchange sur input
   
function validateForm(event, itemId) {
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
    location.reload();
  }

//-----------------------------------supprimer un produit-----------------------------------//

function removeItem(itemId) {
    // retourne un nouveau tableau contenant les élements du tableau d'origine qui n'ont pas le même Id que celui du click sur suppr
    const newCart = cartRestored.filter(product => product._id !== itemId);
    if (newCart) {
        // mise à jour du panier
        localStorage.setItem("cart", JSON.stringify(newCart)); 
    }
    location.reload();
} 


//-----------------------------------FORMULAIRE-----------------------------------//
// fonction provenant de bootstrap qui permet d'afficher si des champs sont mal renseignés visuellement
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation');
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      });
  })();