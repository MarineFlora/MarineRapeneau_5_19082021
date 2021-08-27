// variables pour extraire le paramètre id de l'URL
let params = new URL(window.location).searchParams;
let id = params.get('id');

// fonction pour recuperer produit et l'afficher
function loadProduct() {
    fetch("http://localhost:3000/api/cameras/"+ id)
    .then(data => data.json()) // transforme données reçues en format json
    .then(product => { // recupere produit + affiche
        camera = product
        document.getElementById("product").innerHTML += `<div class="row">
                                                                <div class="col pb-3">
                                                                    <h1 class="text-left fw-bold">${camera.name}</h1>
                                                                </div>
                                                            </div>

                                                            <div class="card "> 
                                                                <div class="row no-gutters">
                                                                    <div class="col-lg-8">
                                                                        <img class="card-img-top card-img-cam" src="${camera.imageUrl}" alt="camera vintage" />
                                                                    </div>
                                                                    <div class="col-lg-4">
                                                                        <div class="card-body text-center ">
                                                                            <p class="card-text price fw-bold">${camera.price/100} €</p>
                                                                            <p class="card-text">${camera.description}</p>
                                                                            <p class="text-success card-text">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                                                                </svg>
                                                                                En stock
                                                                            </p>
                                                                            <div class="d-flex flex-column align-items-center">
                                                                                <select class="form-select form-select-sm my-2" aria-label="multiple select">
                                                                                    <option value="">Choix lentille</option>
                                                                                    <option value="lens 1">lens 1 </option>
                                                                                    <option value="lens 2">lens 2</option>
                                                                                    <option value="lens 3">lens 3 </option>
                                                                                </select>
                                                                                <select class="form-select form-select-sm my-2" aria-label="multiple select">
                                                                                    <option value="">Quantité</option>
                                                                                    <option value="1">1 </option>
                                                                                    <option value="2">2</option>
                                                                                    <option value="3">3</option>
                                                                                    <option value="3">4</option>
                                                                                    <option value="3">5</option>
                                                                                </select>
                                                                            </div>  
                                                                            <a href="#" class="btn btn-primary my-4">ajouter au panier</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>` //  permet l'affichage : pour l'élement ID 'product', on va remplacer dans le template les élements voulus avec l'objet camera. Interpolation de caractère : ${variable voulue}
        })
    
    .catch(error => alert("Une erreur est survenue")); 
}

