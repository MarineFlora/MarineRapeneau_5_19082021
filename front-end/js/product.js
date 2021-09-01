// variables pour extraire le paramètre id de l'URL
let params = new URL(window.location).searchParams;
let id = params.get('id');

// fonction pour recuperer produit et l'afficher
function loadProduct() {
    fetch("http://localhost:3000/api/cameras/"+ id)
    .then(data => data.json()) // transforme données reçues en format json
    .then(product => { // recupere produit + affiche
        camera = product
        addLenses()
        document.getElementById("product-img").innerHTML += `<img class="card-img-top card-img-cam" src="${camera.imageUrl}" alt="camera vintage ${camera.name}" />` // affichage de l'image correspondante
        document.getElementById("product-infos").innerHTML +=` <h1 class="card-title fw-bold">${camera.name}</h1>
                                                                <p class="card-text price fw-bold">${camera.price/100} €</p>
                                                                <p class="card-text">${camera.description}</p>  
                                                              ` //  affichage : pour l'élement ID 'product-infos'
    })
    
    .catch(error => alert("Une erreur est survenue")); 
}

// fonction boucle qui parcourt les lentilles + affiche l'option dans element "select"
function addLenses() {
    for(let i = 0; i < camera.lenses.length; i++) {
        document.getElementById("select-lens").innerHTML += `<option value="${camera.lenses[i]}">${camera.lenses[i]}</option>`
    }
}

//variables pour fonction addToCart
const cart = []
// fonction ajoute au localStorage
function addToStorage(){
    localStorage.setItem("cart", JSON.stringify(cart)); // conversion en JSON
    let cartRestored = JSON.parse(localStorage.getItem("cart")); //reconversion de l'objet en JS
    console.log(cartRestored); //variable cartRestored contient maintenant l'objet qui avait été sauvegardé dans le localStorage
}

// ajout des produits au panier
function addToCart() {
    let selectedLens = document.getElementById("select-lens").value; // on récupère les valeurs de l'objectif choisi et la quantité
    let selectedQuantity = document.getElementById("select-quantity").value;

    // affiche un message d'erreur si options non selectionnées
    if (selectedLens == "" && selectedQuantity =="") {
        alert("Vous devez choisir une lentille et une quantité");
    } else if (selectedLens == "") { 
        alert("Vous devez choisir une lentille");
    } else if (selectedQuantity == ""){
        alert("Vous devez choisir une quantité");
    }
      else {
        
        /*const productExist = cart.find(element => element != ""); // vérifier que le produit existe
        console.log(productExist);*/ //undefined...
        cart.push({ // ajoute l'élement au panier
            image : camera.imageUrl,
            name : camera.name,
            id : camera._id,
            lenses: selectedLens.value,
            description : camera.description,
            price : camera.price/100,
            quantity : selectedQuantity.value, 
        })
        // ajoute l'élement dans storage, 
        addToStorage()
        
        //Affichage message pour confirmer ajout panier + résumé + rediriger vers panier ou accueil
        document.getElementById("pop-up").innerHTML += `<div class="modal" id="exampleModalCenter" tabindex="-1" role="dialog" aria-hidden="true">
                                                        <div class="modal-dialog modal-dialog-centered" role="document">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h3 class="modal-title text-success"> 
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
                                                                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                                                        </svg>
                                                                        Ajouté au panier !
                                                                    </h3> 
                                                                </div>
                                                                <div class="modal-body d-flex flex-row justify-content-around align-items-center">
                                                                    <img src="${camera.imageUrl}" alt="camera vintage ${camera.name}" class="camera-mini"/>
                                                                    <div>
                                                                        <p class="fw-bold">Modèle</p>
                                                                        <p>${camera.name}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p class="fw-bold">Lentille</p>
                                                                        <p>${selectedLens}</p>
                                                                    </div>
                                                
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <a href="index.html" class="btn border-0">< Continuer mes achats</a>
                                                                    <a href="cart.html" class="btn btn-primary">Voir mon panier</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>`
        
    }

}

