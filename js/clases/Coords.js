// Coords → Coordenadas para adjuntar a un objeto Shop
class Coords{
    #latitude;
    #longitude;
    // CONSTRUCTOR
    constructor (latitude, longitude){
        this.#latitude = latitude;
        this.#longitude = longitude;
    }
    // GETTERS Y SETTERS
    get getLatitude(){
        return this.#latitude;
    }
    set setLatitude(latitude){
        if (latitude !=""){
            this.#latitude = latitude;
        }
        else{
            console.log('Excepción → La latitud está vacía')
        }
    }
    get getLongitude(){
        return this.#longitude;
    }
    set setLongitude(longitude){
        if (longitude !=""){
            this.#longitude = longitude;
        }
        else{
            console.log('Excepción → La longitud está vacía')
        }
    }
}