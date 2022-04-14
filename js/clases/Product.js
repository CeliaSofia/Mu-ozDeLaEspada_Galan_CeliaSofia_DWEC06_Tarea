// Product → Representa un producto
(function(){
    let abstractCreateLock = true; //Definición del cerrojo.
    class Product{
        #serialNumber;
        #nameProduct;
        #descriptionProduct;
        #price;
        #tax;
        #images;
        #categories
        // CONSTRUCTOR
        constructor(serialNumber, nameProduct, descriptionProduct, price, tax, images, categories = []){
            if (serialNumber == "" || nameProduct == "" || price == ""){
                throw "Excepción → Faltan datos obligatorios";
            }
            else{
                this.#serialNumber = serialNumber;
                this.#nameProduct = nameProduct;
                this.#descriptionProduct = descriptionProduct;
                this.#price = price;
                this.#tax = tax;
                this.#images = images;
                this.#categories = categories;
            }
        }
        // GETTERS Y SETTERS
        get getSerialNumber(){
            return this.#serialNumber;
        }
        set setSerialNumber(serialNumber){
            if (serialNumber !=""){
                this.#serialNumber = serialNumber;
            }
            else{
                console.log('Excepción → El número de serie está vacío')
            }
        }
        get getNameProduct(){
            return this.#nameProduct;
        }
        set setNameProduct(nameProduct){
            if (nameProduct !=""){
                this.#nameProduct = nameProduct;
            }
            else{
                console.log('Excepción → El nombre del producto está vacío')
            }
        }
        get getDescriptionProduct(){
            return this.#descriptionProduct;
        }
        set setDescriptionProduct(descriptionProduct){
            this.#descriptionProduct = descriptionProduct;
        }
        get getPrice(){
            return this.#price;
        }
        set setPrice(price){
            if (price !=""){
                this.#price = price;
            }
            else{
                console.log('Excepción → El precio del producto está vacío')
            }
        }
        get getTax(){
            return this.#tax;
        }
        set setTax(tax){
            this.#tax = tax;
        }
        get getImages(){
            return this.#images;
        }
        set setImages(images){
            this.#images = images;
        }
        get getCategories(){
            return this.#categories;
        }
        set setCategories(categories){
            this.#categories = categories;
        }
        borraCategoria(categoriaAEliminar){ // método creado para DWEC06
            for (let i = 0; i<this.#categories.length; i++){
                if (categoriaAEliminar == this.#categories[i]){
                    this.#categories.splice(i, 1); // si coincide lo elimino
                }
            }
        }
    }
    Object.defineProperty(Product.prototype, "serialNumber", {enumerable: true});
    Object.defineProperty(Product.prototype, "nameProduct", {enumerable: true});
    Object.defineProperty(Product.prototype, "descriptionProduct", {enumerable: true});
    Object.defineProperty(Product.prototype, "price", {enumerable: true});
    Object.defineProperty(Product.prototype, "tax", {enumerable: true});
    Object.defineProperty(Product.prototype, "images", {enumerable: true});
    Object.defineProperty(Product.prototype, "categories", {enumerable: true});

    // Coche → subclase1 de Product
    class Coche extends Product{
        #color;
        #type;
        #power;
        // CONSTRUCOR
        constructor (serialNumber, nameProduct, descriptionProduct, price, tax, images, categories, type, color, power){
            abstractCreateLock = false; //Desactivamos el cerrojo.
            super(serialNumber, nameProduct, descriptionProduct, price, tax, images, categories);
            this.#color = color;
            this.#type = type;
            this.#power = power;
        }
        // GETTERS Y SETTERS
        get getType(){
            return this.#type;
        }
        set setType(type){
            this.#type = type;
        }
        get getColor(){
            return this.#color;
        }
        set setColor(color){
            this.#color = color;
        }
        get getPower(){
            return this.#power;
        }
        set setPower(power){
            this.#power = power;
        }
    }
    Object.defineProperty(Coche.prototype, "color", {enumerable: true});
    Object.defineProperty(Coche.prototype, "type", {enumerable: true});
    Object.defineProperty(Coche.prototype, "power", {enumerable: true});


// Moto → subclase2 de Product
    class Moto extends Product{
        #type;
        #color;
        #power;
        // CONSTRUCOR
        constructor (serialNumber, nameProduct, descriptionProduct, price, tax, images, categories, type, color, power){
            abstractCreateLock = false; //Desactivamos el cerrojo.
            super(serialNumber, nameProduct, descriptionProduct, price, tax, images, categories);
            this.#type = type;
            this.#color = color;
            this.#power = power;
        }
        // GETTERS Y SETTERS
        get getType(){
            return this.#type;
        }
        set setType(type){
            this.#type = type;
        }
        get getColor(){
            return this.#color;
        }
        set setColor(color){
            this.#color = color;
        }
        get getPower(){
            return this.#power;
        }
        set setPower(power){
            this.#power = power;
        }
    }
    Object.defineProperty(Moto.prototype, "type", {enumerable: true});
    Object.defineProperty(Moto.prototype, "color", {enumerable: true});
    Object.defineProperty(Moto.prototype, "power", {enumerable: true});

// Bicicleta → subclase3 de Product
    class Bicicleta extends Product{
        #type;
        #material;
        #size;
        // CONSTRUCOR
        constructor (serialNumber, nameProduct, descriptionProduct, price, tax, images, categories, type, material, size){
            abstractCreateLock = false; //Desactivamos el cerrojo.
            super (serialNumber, nameProduct, descriptionProduct, price, tax, images, categories);
            this.#type = type;
            this.#material = material;
            this.#size = size;
        }
        // GETTERS Y SETTERS
        get getType(){
            return this.#type;
        }
        set setType(type){
            this.#type = type;
        }
        get getMaterial(){
            return this.#material;
        }
        set setMaterial(material){
            this.#material = material;
        }
        get getSize(){
            return this.#size;
        }
        set setSize(size){
            this.#size = size;
        }
    }
    Object.defineProperty(Bicicleta.prototype, "type", {enumerable: true});
    Object.defineProperty(Bicicleta.prototype, "material", {enumerable: true});
    Object.defineProperty(Bicicleta.prototype, "size", {enumerable: true});

    window.Product = Product;
    window.Coche = Coche;
    window.Moto = Moto;
    window.Bicicleta = Bicicleta;
})(); // Invocamos la función global

