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

        // affichage du formulaire de contact
        document.getElementById("form-contact").innerHTML = `<h2 class="my-4">Complétez le formulaire ci-dessous pour valider votre commande :</h2>
                                                                <div class="row">
                                                                    <div class="form-group col-md-6 mb-3">
                                                                        <label for="lastName">Nom</label>
                                                                        <input type="text" id="lastName" name="lastName" class="form-control text-uppercase" pattern="[A-Za-z- ]+" placeholder="DUPONT" required>
                                                                    </div>

                                                                    <div class="form-group col-md-6 mb-3">
                                                                        <label for="firstName">Prénom</label>
                                                                        <input type="text" id="firstName" name="firstName" class="form-control text-capitalize" pattern="[A-Za-z- ]+"  placeholder="Jean" required>
                                                                    </div>
                                                                </div>

                                                                <div class="row">
                                                                    <div class="form-group col mb-3">
                                                                        <label for="address">Adresse</label>
                                                                        <input type="text" id="address" name="adress" class="form-control" minlength="7" placeholder="1 Grande rue" required>
                                                                    </div>
                                                                </div>

                                                                <div class="row">
                                                                    <div class="form-group col mb-3">
                                                                        <label for="adressComplement">Complément d'adresse (facultatif)</label>
                                                                        <input type="text" id="adressComplement" name="adressComplement" class="form-control" placeholder="Appartement, bâtiment, boite postale...">
                                                                    </div>
                                                                </div>

                                                                <div class="row">
                                                                    <div class="form-group col-md-9 mb-3">
                                                                        <label for="city">Ville</label>
                                                                        <input type="text" id="city" name="city" class="form-control text-uppercase"  placeholder="Paris" required>
                                                                    </div>
                                                                
                                                                    <div class="form-group col-md-3 mb-3">
                                                                        <label for="zipCode">Code Postal</label>
                                                                        <input type="text" id="zipCode" name="zipCode" pattern="[0-9]{5}" class="form-control"  placeholder="75000" required>
                                                                        <div class="invalid-feedback">doit contenir 5 chiffres</div>
                                                                    </div>
                                                                </div>

                                                                <div class="row">
                                                                    <div class="form-group col mb-3">
                                                                        <label for="inputEmail">Email</label>
                                                                        <div class="input-group">
                                                                            <div class="input-group-prepend">
                                                                                <span class="input-group-text" id="inputGroupPrepend">@</span>
                                                                            </div>  
                                                                            <input type="email" id="email" name="email" class="form-control" placeholder="Email" required>
                                                                            <div class="invalid-feedback">Veuillez saisir une adresse email valide</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div class="row">
                                                                    <div class="col text-center">
                                                                        <button type="submit" class="btn btn-primary fw-bold my-4 w-auto ">Valider mon panier</button>
                                                                    </div>
                                                                </div> `;
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

// Validation
// fonction provenant de bootstrap qui permet d'afficher si des champs sont mal renseignés
(function () {
     // utilise Javascript en mode strict = semantique légèrement différente du "normal" (élimine certaines erreurs)
    'use strict'
  
    // Récupère les formulaires sur lesquels ont veut appliquer la validation custom Bootstrap
    var forms = document.querySelectorAll('.needs-validation');
  
    // boucle le formulaire, quand click sur bouton envoyer,  
    // vérifie validité et ajoute la class 'was-validated' = style pour validité, si invalide : empeche l'envoi du form
    // dernier "();" = exécute immédiatement la fonction
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


  //-----------------------------------Envoi panier + formulaire -----------------------------------//

  function submitOrder(event) {
      event.preventDefault();

      // récupération des valeurs des input 
      const formData = new FormData(event.target);
      const lastName = formData.get('lastName');
      const firstName = formData.get('firstName');
      const adress = formData.get('adress');
      const adressComplement = formData.get('adressComplement');
      const city = formData.get('city');
      const zipCode = formData.get('zipCode');
      const email = formData.get('email');


      // envoi panier et contact
      if (form.checkValidity() && cartRestored.length > 0) {
          // créer une instance de la classe Contact
          const contact = new Contact(lastName, firstName, adress, adressComplement, city, zipCode, email);

      }
  }