// Store → Información de una tienda
class Store{
    #cif;
    #nameStore;
    #adressStore;
    #phoneStore;
    #coordsStore;
    #products;
    #stock;
    // CONSTRUCTOR
    constructor(cif, nameStore, adressStore, phoneStore, coordsStore, products, stock){
        this.#cif = cif;
        this.#nameStore = nameStore;
        this.#adressStore = adressStore;
        this.#phoneStore = phoneStore;
        this.#coordsStore = coordsStore;
        this.#products = products;
        this.#stock = stock;

    }
    // GETTERS Y SETTERS
    get getCif(){
        return this.#cif;
    }
    set setCif(cif){
        this.#cif = cif;
    }
    get getNameStore(){
        return this.#nameStore;
    }
    set setNameStore(nameStore){
        if (nameStore !=""){
            this.#nameStore = nameStore;
        }
        else{
            console.log('Excepción → El nombre de la tienda está vacío')
        }
    }
    get getAdressStore(){
        return this.#adressStore;
    }
    set setAdressStore(adressStore){
        this.#adressStore = adressStore;
    }
    get getPhoneStore(){
        return this.#phoneStore;
    }
    set setPhoneStore(phoneStore){
        this.#phoneStore = phoneStore;
    }
    get getCoordsStore(){
        return this.#coordsStore;
    }
    set setCoordsStore(coordsStore){
        this.#coordsStore = coordsStore;
    }
    get getProducts(){
        return this.#products;
    }
    set setProducts(products){
        this.#products = products;
    }
    get getStock(){
        return this.#stock;
    }
    set setStock(stock){
        this.#stock = stock;
    }
}