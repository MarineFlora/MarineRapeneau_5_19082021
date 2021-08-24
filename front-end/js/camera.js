/* Structure de la classe camera qui représente un objet camera */


class Camera {
    constructor(jsonCamera) {
        this.id = jsonCamera.id;
        this.name = jsonCamera.name;
        this.price = jsonCamera.price;
        this.description = jsonCamera.description;
        this.imageUrl = jsonCamera.imageUrl;
    }
}