//---------------------------RECUPERATION  DES CAMERAS DE L'API AVEC L'ID---------------------------// 
// variable pour la camera selectionnée
let selectedCamera;

// variables pour extraire le paramètre id de l'URL
let params = new URL(window.location).searchParams;
const id = params.get("id");

// fonction pour recuperer produit et l'afficher
function loadProduct() {
    fetch("http://localhost:3000/api/cameras/"+ id)
    .then(data => data.json()) // transforme données reçues en format json
    .then(camera => { // recupere produit + affiche
        //créer l'objet camera à partir de la classe Camera
        selectedCamera = camera;
        addLenses(camera);
        displayProduct(camera);
    })
    
    .catch(error => console.log(error) ); 
}

// fonction pour afficher le produit choisi
function displayProduct(camera) {
    if (camera) {
        document.getElementById("product-img").innerHTML += `<img class="card-img-top card-img-cam" src="${camera.imageUrl}" alt="camera vintage ${camera.name}" />` // affichage de l'image correspondante
        document.getElementById("product-infos").innerHTML +=` <h1 class="card-title fw-bold">${camera.name}</h1>
                                                                <p class="card-text price fw-bold">${camera.price/100} €</p>
                                                                <p class="card-text">${camera.description}</p>  
                                                              ` //  affichage : pour l'élement ID 'product-infos'
    }
    
}

// fonction boucle qui parcourt les lentilles + affiche l'option dans element "select"
function addLenses(camera) {
    if (camera) {
        for(let i = 0; i < camera.lenses.length; i++) {
            document.getElementById("select-lens").innerHTML += `<option value="${camera.lenses[i]}">${camera.lenses[i]}</option>`
        }
    }
   
}

//---------------------------AJOUT DE LA CAMERA AU PANIER---------------------------// 

// fonction ajoute au localStorage ne sert à rien en fait... 
/*function addToStorage(event){
    event.preventDefault();
    // recuperer le panier
    const cart = localStorage.getItem("cart");
    if (cart == null) {
        alert("le panier est vide");
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // conversion en JSON
    let cartRestored = JSON.parse(localStorage.getItem("cart")); //reconversion de l'objet en JS
    console.log(cartRestored); *///variable cartRestored contient maintenant l'objet qui avait été sauvegardé dans le localStorage
//}

// ajout des produits au panier
function addToCart(event) {
    event.preventDefault();
    
    // on récupère le produit que la personne a personnalisé pour l'ajouter au panier
    
     // on récupère les valeurs de l'objectif choisi
     let selectedLens = document.getElementById("select-lens").value;
     console.log(selectedLens);
 
     // on récupère la quantité indiquée
     let quantity = document.getElementById("select-quantity").value;
     console.log(quantity);

   // 
     /*const productAdd = { 
        imageUrl : selectedCamera.imageUrl,
        name : selectedCamera.name,
        id : selectedCamera._id,
        lenses: selectedLens,
        description : selectedCamera.description,
        price : (selectedCamera.price/100)*quantity,
        quantity, 
    }
    console.log(productAdd);*/

    // on modifie le prix, la quantité, les lentilles
    selectedCamera.quantity = quantity;
    selectedCamera.price = (selectedCamera.price/100)*quantity;
    // envoi des données au localStorage, si le panier est vide on l'initialise avec un array vide
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // si le panier est vide, on ajoute le 1er produit
    if (cart.length == 0) {
        cart.push(selectedCamera);
      //  cart.push(productAdd); 
    } else { // le panier a des déjà des élements : verifier si le produit selectionné existe déjà dans le localStorage pour accumuler les quantités
        const sameProducts = cart.find(product => product._id === selectedCamera._id); // recherche les même id
        if (sameProducts) { // quantité des produits aux mêmes id est calculée en additionnant la quantité déjà présente dans le storage et la nouvelle quantité ajoutée, idem pour prix 
            sameProducts.quantity = parseInt(sameProducts.quantity) + parseInt(selectedCamera.quantity); 
            sameProducts.price = sameProducts.price + selectedCamera.price; 
        } else {
            cart.push(selectedCamera);
            //  cart.push(productAdd); 
        }
    } 

    localStorage.setItem("cart", JSON.stringify(cart)); // ajoute l'élement dans le storage
   

    // on affiche un message d'erreur si options non selectionnées
    if (selectedLens == "" && quantity =="") {
        alert("Vous devez choisir une lentille et une quantité");
    } else if (selectedLens == "") { 
        alert("Vous devez choisir une lentille");
    } else if (quantity == ""){
        alert("Vous devez choisir une quantité");
    }
     
       //Affichage message pour confirmer ajout panier + résumé + rediriger vers panier ou accueil
        if (event) {
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
                                                                    <img src="${selectedCamera.imageUrl}" alt="camera vintage ${selectedCamera.name}" class="camera-mini"/>
                                                                    <div>
                                                                        <p class="fw-bold">Modèle</p>
                                                                        <p>${selectedCamera.name}</p>
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



