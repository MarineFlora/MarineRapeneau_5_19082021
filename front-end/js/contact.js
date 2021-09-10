/* Structure de la classe Contact qui représente un objet contact qui contient les données saisies du formulaire */

class Contact {
    constructor(lastName, firstName, adress, adressComplement, city, zipCode, email) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.adress = adress;
        this.adressComplement = adressComplement;
        this.city = city;
        this.zipCode = zipCode;
        this.email = email;
    }
}