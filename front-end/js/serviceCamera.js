/* méthode fetch pour récupérer la liste des cameras du serveur et les afficher sur la page d'accueil index.html */ //

function loadCameras() {
    fetch("http://localhost:3000/api/cameras/")
    .then(data => data.json()) // transforme données reçues en format json
    .then(jsonListCamera => { // affiche les données dans la console
        for(let jsonCamera of jsonListCamera) { // boucle qui parcours le tableau, pour chaque case du tableau elle créé une variable jsonCamera qui pourra être manipulée directement
            let camera = new Camera(jsonCamera); // pour chaque camera on créé un objet camera
            document.getElementById("cards").innerHTML += `<div class="col-12 col-md-6 col-lg-4 py-3">
                                                            <div class="card"> 
                                                                <img class="card-img-top" src="${camera.imageUrl}" alt="camera vintage" />
                                                                <div class="card-body text-center">
                                                                    <h2 class="card-title">${camera.name}</h2>
                                                                    <p class="card-text price fw-bold">${camera.price} €</p>
                                                                    <a href="camera.html" onClick="selectCamera('${camera.id}');" class="btn btn-primary">Voir produit</a>
                                                                </div>
                                                            </div>
                                                          </div>` //  permet l'affichage : pour l'élement ID 'cards', on va remplacer dans le template les élements voulus avec l'objet camera. Interpolation de caractère : ${variable voulue}
        }
    });
}

function selectCamera(cameraId) {
    alert("Vous avez sélectionné la caméra Id= " + cameraId); 
}
