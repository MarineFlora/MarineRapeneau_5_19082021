//---------------------------RECUPERATION  DES CAMERAS DE L'API AVEC L'ID---------------------------// 
// variable pour la camera selectionnée
let selectedCamera;

// variables pour extraire le paramètre id de l'URL
let params = new URL(window.location).searchParams;
const id = params.get("id");

// fonction pour recuperer produit et l'afficher
function loadProduct() {
    fetch("http://localhost:3000/api/cameras/"+ id)
    // transforme données reçues en format json
    .then(data => data.json()) 
    // recupere produit + affiche
    .then(camera => { 
        //créer l'objet camera à partir de la classe Camera
        selectedCamera = camera;
        addLenses(camera);
        displayProduct(camera);
    })
    
    .catch(error => console.log(error)); 
}

//---------------------------AJOUT DE LA CAMERA AU PANIER---------------------------// 

// ajout des produits au panier
function addToCart(event) {
    event.preventDefault();
    
    // on récupère les valeurs de l'objectif choisi
    let selectedLens = document.getElementById("select-lens").value;
    console.log(selectedLens);
 
    // on récupère la quantité indiquée
    let quantity = document.getElementById("select-quantity").value;
    console.log(quantity);

    // on affiche un message d'erreur si options non selectionnées
    if (selectedLens == "" && quantity =="") {
        alert("Vous devez choisir une lentille et une quantité");
    } else if (selectedLens == "") { 
        alert("Vous devez choisir une lentille");
    } else if (quantity == ""){
        alert("Vous devez choisir une quantité");
    } 
    // sinon on ajoute au panier et on affiche le message pop-up de confirmation
    else {
         // on modifie le prix, la quantité
        selectedCamera.quantity = quantity;
        selectedCamera.price = (selectedCamera.price/100)*quantity;
        // envoi des données au localStorage, si le panier est vide on l'initialise avec un array vide
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // si le panier est vide, on ajoute le 1er produit
        if (cart.length == 0) {
            cart.push(selectedCamera);
        } 
        // sinon verifier si le produit selectionné existe déjà dans le localStorage pour accumuler les quantités
        else { 
            // recherche les même id
            const sameProducts = cart.find(product => product._id === selectedCamera._id); 
            if (sameProducts) {
                // quantité des produits calculée en additionnant la quantité déjà présente dans le storage et la nouvelle quantité ajoutée, idem pour prix 
                sameProducts.quantity = Number(sameProducts.quantity) + Number(selectedCamera.quantity); 
                sameProducts.price = sameProducts.price + selectedCamera.price; 
            } else {
                cart.push(selectedCamera);
            }
        } 

        // ajoute l'élement dans le storage
        localStorage.setItem("cart", JSON.stringify(cart)); 

        // Affichage message pop-up
        buildPopUpMessage(selectedCamera);
            
    }

    
}



