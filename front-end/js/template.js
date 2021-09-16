// Templates utilisés pour les élements

//----------------------------------- PAGE CART.js -----------------------------------//

// retour des informations, prix et quantité des cameras ajoutées au panier
function buildCartElements(item) {
    return `<div class="row p-3 text-center justify-content-between align-items-center">
                <div class="col-sm-3 mb-2">
                    <img id="product-img" class="camera-mini" src="${item.imageUrl}" alt="camera vintage ${item.name} " />
                </div>
                <div class="col-sm-3">
                    <p class="mb-2">${item.name}</p>
                </div>
                <p class="col-sm-2 fw-bold mb-2 price-product" >${item.price} €</p>  
                <div class="col-md-2 mb-2 d-flex justify-content-center align-items-center">
                    <input type="number" min="1" max="100" value="${item.quantity}"  id="${item._id}" class="form-control form-select-sm input-sm input-vh" onblur="priceUpdate(event, '${item._id}')" onchange="priceUpdate(event, '${item._id}')" />
                </div>
                <a href="cart.html" class="col-md-2 mb-4" onclick="removeItem('${item._id}')">supprimer</a>                     
             </div>`; 
}


//----------------------------------- PAGE PRODUCT.js -----------------------------------//

// fonction pour afficher le produit choisi
function displayProduct(camera) {
    if (camera) {
        document.getElementById("product-img").innerHTML += `<img class="card-img-top card-img-cam" src="${camera.imageUrl}" alt="camera vintage ${camera.name}" />`; 
        document.getElementById("product-infos").innerHTML +=` <h1 class="card-title fw-bold">${camera.name}</h1>
                                                                <p class="card-text price fw-bold">${camera.price/100} €</p>
                                                                <p class="card-text">${camera.description}</p>;` 
    }   
}

// fonction boucle qui parcourt les lentilles + affiche l'option dans element "select"
function addLenses(camera) {
    if (camera) {
        for(let i = 0; i < camera.lenses.length; i++) {
            document.getElementById("select-lens").innerHTML += `<option value="${camera.lenses[i]}">${camera.lenses[i]}</option>`;
        }
    }
}

// message pop-up pour confirmer ajout panier + liens
function buildPopUpMessage(selectedCamera) {
    return `<div class="modal" id="exampleModalCenter" tabindex="-1" role="dialog" aria-hidden="true">
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
                                <p class="fw-bold">Prix</p>
                                <p>${selectedCamera.price}</p>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <a href="index.html" class="btn border-0">< Continuer mes achats</a>
                            <a href="cart.html" class="btn btn-primary">Voir mon panier</a>
                        </div>
                    </div>
                </div>
            </div> `
}