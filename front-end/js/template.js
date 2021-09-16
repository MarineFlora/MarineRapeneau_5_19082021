//----------------------------------- templates utilisés pour page cart.js -----------------------------------//

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

