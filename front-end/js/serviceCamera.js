/* méthode fetch pour récupérer la liste des cameras du serveur et les afficher sur la page d'accueil index.html */ //

function loadCameras() {
    fetch("http://localhost:3000/api/cameras/")
    // transforme données reçues en format json
    .then(data => data.json()) 
    // affiche les données dans la console
    .then(jsonListCamera => { 
        // boucle qui parcours le tableau, pour chaque case du tableau elle créé une variable jsonCamera qui pourra être manipulée directement
        for(let jsonCamera of jsonListCamera) { 
            // pour chaque camera on créé un objet camera
            let camera = new Camera(jsonCamera); 
            //  permet l'affichage : pour l'élement ID 'cards', on va remplacer dans le template les élements voulus avec l'objet camera. Interpolation de caractère : ${variable voulue}
            document.getElementById("cards").innerHTML += `<div class="col-12 col-md-6 col-lg-4 py-3">
                                                            <div class="card"> 
                                                                <img class="card-img-top" src="${camera.imageUrl}" alt="camera vintage" />
                                                                <div class="card-body text-center">
                                                                    <h2 class="card-title">${camera.name}</h2>
                                                                    <p class="card-text price fw-bold">${camera.price} €</p>
                                                                    <a href="product.html?id=${camera.id}" class="btn btn-primary">Voir produit</a>
                                                                </div>
                                                            </div>
                                                          </div>`; 
        }
    })
    .catch(error => alert("Une erreur est survenue")); 
}


