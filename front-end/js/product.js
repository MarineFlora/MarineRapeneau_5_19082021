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
                                                                <p class="card-text">${camera.description}</p> ` //  affichage : pour l'élement ID 'product-infos'
    })
    
    .catch(error => alert("Une erreur est survenue")); 
}

// fonction boucle qui parcourt les lentilles + affiche l'option dans element "select"
function addLenses() {
    for(let i = 0; i < camera.lenses.length; i++) {
        document.getElementById("select-lens").innerHTML += `<option value="${camera.lenses[i]}">${camera.lenses[i]}</option>`
    }
}