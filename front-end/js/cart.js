//-----------------------------------récupération du panier-----------------------------------//
let cartRestored = JSON.parse(localStorage.getItem("cart"));
let totalPrice =0;
// fonction pour afficher le contenu de la page panier et récuperer les elements selectionnés
function loadCart() { 
    if (cartRestored == null) {
        document.getElementById("empty-cart").innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-basket2" viewBox="0 0 16 16">
                                                                <path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0v-2z"/>
                                                                <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6H2.163z"/>
                                                            </svg>
                                                            <h1 class="pt-3 fw-bold">Votre panier est vide</h1>
                                                            <a href="index.html" class="link-dark pt-3">Continuer mes achats</a>`; 
    }
    else {
        document.getElementById("continue-shopping").innerHTML = `  <div class="col pb-3">
                                                                        <a href="index.html" class="link-dark text-decoration-none">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                                                                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                                                            </svg>
                                                                    Continuer mes achats
                                                                        </a> 
                                                                    </div>
                                                                    <h1 class="pb-3 col"> Mon panier (${cartRestored.length} produits)</h1>`;
        // boucle pour chaque élement enregistré dans le local storage, ajouter cet html
        cartRestored.forEach(item => {
            totalPrice+=Number(item.price);
            document.getElementById("cart-products").innerHTML += ` <div class=" col-sm-3 mb-2">
                                                                        <img id="product-img" class="camera-mini" src="${item.imageUrl}" alt="camera vintage ${item.name} " />
                                                                    </div>
                                                                    <div class="col-sm-3">
                                                                        <p class="mb-2">${item.name}</p>
                                                                    </div>
                                                                    <p class="col-sm-2 fw-bold mb-2 total-price-product" >${item.price} €</p>` ;  

            document.getElementById("cart-products").innerHTML += ` <div class="col-md-2 mb-2 d-flex justify-content-center align-items-center">
                                                                        <input type="number" min="1" max="100" value="${item.quantity}" class="form-control form-select-sm input-sm input-vh" onclick="newPrice()">
                                                                    </div>`;
                                                                     
            document.getElementById("cart-products").innerHTML += `<a href="cart.html" class="col-md-2 mb-4" onclick="removeItem()">supprimer</a> `;

            
          
        });
        
       
                                                                

        document.getElementById("cart-total").innerHTML += `<h2 class="row text-left pb-2">Récapitulatif</h2>
                                                                <div class="row bg-light p-3 justify-content-center rounded">
                                                                    <p class="col fw-bold text-center">TOTAL</p>
                                                                    <p class="col fw-bold text-center">${totalPrice} €</p>
                                                                    <p class="row fw-light fst-italic">Hors frais de livraison</p>
                                                                    <a href="#" class="btn btn-primary my-4 w-auto">Valider mon panier</a>
                                                                </div>`;
    }
  
    
}

//-----------------------------------recalcul du prix si quantité modifiée-----------------------------------//
//----------------------------------- ERREUR : seule la quantité de la 1ere camera peut être modifiée et prix recalculé, pour autres produits dans le panier, cela rajoute au prix de la 1ere camera, problème boucle ? na pas faire de boucle ?
//----------------------------------- ERREUR d'affichage : le 1er clic sur l'input n'affiche pas le recalcul du prix mais après c'est ok
//----------------------------------- ERREUR localStorage : ne se met pas à jour quand on choisi une nouvelle quantité
function newPrice() {
    let input = document.querySelector('input'); //on récupère l'input sur lequel on click
    const priceProduct = document.querySelector('.total-price-product'); //on récupère le prix qui va être modifié
    for (let i in cartRestored) {
        input.addEventListener('input', updateValue); // on écoute l'évenement (quantité + ou -) et on appelle la fonction callback
        function updateValue(e) { // fonction qui recalcule le prix en prenant la valeur de l'input*le prix unitaire
            priceProduct.textContent = parseInt(e.target.value)*(cartRestored[i].price/parseInt(cartRestored[i].quantity)) +" €";
        }
    }
    localStorage.setItem("cart", JSON.stringify(cartRestored));// réengistrer la quantité choisie dans localStorage : ne fonctionne pas
    
}
   

//-----------------------------------supprimer un produit-----------------------------------//
//----------------------------------- ERREUR : click sur supprimer supprime la 1ere camera(top) pas la camera sur la même ligne
function removeItem(item) {
    cartRestored.splice(item, 1);// permet de supprimer un élement d'un tableau du storage // ERREUR : supprime toujours le 1er element
    localStorage.setItem("cart", JSON.stringify(cartRestored)); // mise à jour du panier
    let cartLength = cartRestored.length;
    if (cartLength == 0) { // s'il n'y a plus de produits dans panier, supprimer le localStorage pour permettre affichage page panier vide
        localStorage.clear(); 
    }
} 


//-----------------------------------calcul du prix total-----------------------------------//
//to do

//-----------------------------------formulaire-----------------------------------//
//to do