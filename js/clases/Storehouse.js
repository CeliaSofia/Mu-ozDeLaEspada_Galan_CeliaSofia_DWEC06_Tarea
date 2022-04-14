//Declaración objeto StoreHouse mediante patrón Singleton
let StoreHouse = (function () { //La función anónima devuelve un método getInstance que permite obtener el objeto único
	let instantiated; //Objeto con la instancia única StoreHouse

	function init() { //Inicialización del Singleton
        class StoreHouse{
            #nombreAlmacen = 'NombreAlmacen';
            #productosAlmacen = [];
            #categoriasAlmacen = [];
            #tiendasAlmacen = [];
            #categoriaPorDefectoAlmacen;
            #tiendaPorDefectoAlmacen;
            // CONSTRUCTOR
            constructor(){
            }
            // GETTERS Y SETTERS
            get getNombreAlmacen(){
                return this.#nombreAlmacen;
            }
            get getProductosAlmacen(){
                let nextIndex = 0;
                // referencia para habilitar el closure en el objeto
                let array = this.#productosAlmacen;
                return {
                    next: function(){
                        return nextIndex < array.length ?
                            {value: array[nextIndex++], done: false} :
                            {done: true};
                    }
                }
            }
            get getCategoriasAlmacen(){
                let nextIndex = 0;
                // referencia para habilitar el closure en el objeto
                let array = this.#categoriasAlmacen;
                return {
                    next: function(){
                        return nextIndex < array.length ?
                            {value: array[nextIndex++], done: false} :
                            {done: true};
                    }
                }
            }
            get getTiendasAlmacen(){
                let nextIndex = 0;
                // referencia para habilitar el closure en el objeto
                let array = this.#tiendasAlmacen;
                return {
                    next: function(){
                        return nextIndex < array.length ?
                            {value: array[nextIndex++], done: false} :
                            {done: true};
                    }
                }
            }
            
            get getCategoriaPorDefectoAlmacen(){
                return this.#categoriaPorDefectoAlmacen;
            }
            get getTiendaPorDefectoAlmacen(){
                return this.#tiendaPorDefectoAlmacen;
            }
            // Método Getter categories
            getterCategories(){
                return this.#categoriasAlmacen;
            }
            // Método Getter shops
            getterShops(){
                return this.#tiendasAlmacen;
            }
            // Método addCategory
            addCategory(category){
                if (category == null){
                    throw 'Excepción → La categoría es nula';
                }
                this.#categoriasAlmacen.forEach(function(elemento){
                    if (elemento.getTitle == category.getTitle){
                        throw 'Excepción → La categoría ya existe';
                    }
                } );
                this.#categoriasAlmacen.push(category);
                return this.#categoriasAlmacen.length;
            }
            // Método removeCategory
            removeCategory(category){
                let encontrado = false;
                for (let i= 0; i<this.#categoriasAlmacen.length; i++){
                    if (this.#categoriasAlmacen[i].getTitle == category){
                        encontrado = true;
                        // Recorro los productos para sustituir los que pertenezcan a la categoría que acaba de ser borrada por la categoría por defecto
                        for (let j = 0; j<this.#productosAlmacen.length; j++){
                            for (let x = 0; x<this.#productosAlmacen[j].length; x++){
                                if (category == this.#productosAlmacen[j][x]){
                                    this.#productosAlmacen[j][x] = this.categoriaPorDefectoAlmacen;
                                }
                            }
                        }
                        this.#categoriasAlmacen.splice(i, 1); // splice(posición, número de elementos a borrar)
                        return this.#categoriasAlmacen.length;
                    }
                }
                if (!encontrado){
                    throw 'Excepción → La categoría no se ha registrado';
                }
            }

            // Método addProduct
            addProduct(product){
                if (product == null){
                    throw 'Excepción → El producto es nulo';
                }
                this.#productosAlmacen.push(product);
                return this.#productosAlmacen.length;
            }
            // Método removeProduct
            removeProduct(productoABorrar){
                let encontrado = false;
                let productos = [];
                for (let i= 0; i<this.#productosAlmacen.length; i++){
                    if (this.#productosAlmacen[i].getSerialNumber == productoABorrar){
                        encontrado = true;
                        for (let j=0; j<this.#tiendasAlmacen.length; j++){ // Recorro las tiendas
                            this.#tiendasAlmacen[j].eliminarProducto(productoABorrar);
                        } 
                        this.#productosAlmacen.splice(i, 1); // Borramos el producto de la lista almacén
                        return this.#productosAlmacen.length;
                    }
                }
                if (!encontrado){
                    throw 'Excepción → El producto introducido no existe';
                }
            }
            // Método addProductInShop
            addProductInShop(productAAnadir, shop, number){
                let tiendaExiste = false;
                let productoExiste = false;
                for (let i=0; i<this.#productosAlmacen.length; i++){ // Recorro el almacén para comprobar que el producto existe
                    if (this.#productosAlmacen[i]['product'].getSerialNumber == productAAnadir['product'].getSerialNumber){
                        productoExiste = true;
                    }
                }
                if (!productoExiste){
                    throw 'Excepción → El producto introducido no existe';
                }
                for (let i=0; i<this.#tiendasAlmacen.length; i++){ // Recorro las tiendas para comprobar que la tienda introducida existe
                    if (this.#tiendasAlmacen[i]['store'].getCif == shop.getCif){
                        tiendaExiste = true;
                        this.#tiendasAlmacen[i]['products'].push(productAAnadir); // Añado el producto a la lista tiendas
                        let stAddProductInShop = {
                            product: productAAnadir,
                            store: shop,
                            stock: number
                        }
                        
                        return this.#tiendasAlmacen[i]['products'].length; // Cantidad de productos que hay en esa tienda
                    }
                }
                if (!tiendaExiste){
                    throw 'Excepción → La tienda introducida no existe';
                }
            }
            // Método addQuantityProductInShop
            addQuantityProductInShop(product, shop, number = 1){
                let productoExiste = false;
                let tiendaExiste = false;
                let productoExisteEnTienda = false;
                if (number <0){
                    throw 'Excepción → El stock es negativo'
                }
                for (let i=0; i<this.#productosAlmacen.length; i++){ // Recorro el almacén para comprobar que el producto existe
                    if (this.#productosAlmacen[i]['product'].getSerialNumber == product.getSerialNumber){
                        productoExiste = true;
                    }
                }
                if (!productoExiste){
                    throw 'Excepción → El producto introducido no existe';
                }
                for (let i=0; i<this.#tiendasAlmacen.length; i++){   // Recorro la lista tiendas para comprobar con una comparación si existe el producto y la tienda seleccionada
                    if (this.#tiendasAlmacen[i]['store'].getCif == shop.getCif){
                        tiendaExiste = true;
                        for (let j = 0; j<this.#tiendasAlmacen[i]['products'].length; j++){
                            if (this.#tiendasAlmacen[i]['products'][j]['product'].getSerialNumber == product.getSerialNumber){
                                productoExisteEnTienda = true;
                            }
                        }
                    }
                }
                if (!tiendaExiste){
                    throw 'Excepción → La tienda introducida no existe';
                }
                if (!productoExisteEnTienda){
                    throw 'Excepción → El producto introducido no existe en la tienda introducida';
                } 
                else{
                        // crear de nuevo TODO
                }
            }
            // Método getCategoryProducts
            getCategoryProducts(category, tipo = 'ningunTipo'){ // Tipo por defecto
                let categoriaEncontrada = false;
                let iteradorProductos = [];
                if (category == null){
                    throw 'Excepción → La categoría es nula';
                }
                for (let i = 0; i<this.#categoriasAlmacen.length; i++){ // recorro las categorías
                    if (this.#categoriasAlmacen[i].getTitle == category.getTitle){
                        categoriaEncontrada = true;
                        for (let j=0; j<this.#productosAlmacen.length; j++){ // recorro los productos para saber si pertenece a la categoría
                            for (let x=0; x<this.#productosAlmacen[j]['categories'].length; x++){ // recorro la lista de categorías dentro la lista productos
                                if (this.#productosAlmacen[j]['categories'][x] == category.getTitle){
                                    // si el tipo es por defecto o coincide con el tipo que nos han pasado:
                                    if (tipo == 'ningunTipo' || tipo == this.#productosAlmacen[j]['product'].constructor.name){ // Buscamos que nos devuelva el nombre de la clase; (name → reservado en js)
                                        let stock = 0;
                                        // TODO crear de nuevo
                                        let productoStock = {
                                            'product': this.#productosAlmacen[j]['product'],
                                            'stock': stock
                                        }
                                        iteradorProductos.push(productoStock);
                                    }
                                }
                            }
                        }
                        return iteradorProductos;
                    }
                }
                if (!categoriaEncontrada){
                    throw 'Excepción → La categoría no existe';
                }
            }
            // Método addShop
            addShop(shop){
                if (shop == null){
                    throw 'Excepción → La tienda es nula';
                }
                this.#tiendasAlmacen.forEach(function(elemento){
                    if (elemento.getCif == shop.getCif){
                        throw 'Excepción → La tienda ya existe';
                    }
                } );
                this.#tiendasAlmacen.push(shop);
                return this.#tiendasAlmacen.length;
            }
            // Método removeShop
            removeShop(tiendaABorrar){
                let tiendaEncontrada = false;
                for (let i = 0; i<this.#tiendasAlmacen.length; i++){ // recorro las tiendas para buscar la tienda que quiero borrar
                    if (this.#tiendasAlmacen[i].getCif == tiendaABorrar){ // compruebo que la tienda que me han pasado, existe
                        this.#tiendasAlmacen.splice(i, 1);
                    }
                }
            }
            // Método getShopProducts
            getShopProducts(shop, tipo = 'ningunTipo'){
                let tiendaEncontrada = false;
                let iteradorProductos = [];
                if (shop == null){
                    throw 'Excepción → La tienda es nula';
                }
                for (let i = 0; i< this.#tiendasAlmacen.length; i++){ // recorro las tiendas
                    if (this.#tiendasAlmacen[i]['store'].getCif == shop.getCif){ // si la tienda que me han dado coincide con tienda de la lista tiendas
                        tiendaEncontrada = true;
                        for (let j=0; j<this.#tiendasAlmacen[i]['products'].length; j++){// recorro los productos de la tienda introducida
                            // si el tipo es por defecto o coincide con el tipo que nos han pasado:
                            if (tipo == 'ningunTipo' || tipo == this.#tiendasAlmacen[i]['products'][j]['product'].constructor.name){ // Buscamos que nos devuelva el nombre de la clase; (name → reservado en js)
                                let stock = 0;
                                // TODO crear recorrido de stock
                                let productoStock = {
                                    'product': this.#tiendasAlmacen[i]['products'][j]['product'],
                                    'stock': stock
                                }
                                iteradorProductos.push(productoStock);
                            }
                        }
                        return iteradorProductos;
                    }
                }
                if (!tiendaEncontrada){
                    throw 'Excepción → La tienda no existe';
                }
            }
        }
		Object.defineProperty(StoreHouse.prototype, "productosAlmacen", {enumerable: true});
		Object.defineProperty(StoreHouse.prototype, "categoriasAlmacen", {enumerable: true});
		Object.defineProperty(StoreHouse.prototype, "tiendasAlmacen", {enumerable: true});

		let sh = new StoreHouse();//Devolvemos el objeto StoreHouse para que sea una instancia única.
		Object.freeze(sh);
		return sh;
	} //Fin inicialización del Singleton
	return {
		// Devuelve un objeto con el método getInstance
		getInstance: function () {
			if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
				instantiated = init(); //instantiated contiene el objeto único
			}
			return instantiated; //Si ya está asignado devuelve la asignación.
		}
	};
})();
