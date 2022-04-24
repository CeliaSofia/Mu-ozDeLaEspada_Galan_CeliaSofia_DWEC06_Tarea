function formLogin(){ 
    let contenido = $('#contenido'); // guardamos la localización en el html de contenido
    contenido.empty();
    let formLog = $(`<form id="formLogin">
        <div class="form-group">
            <label for="username">Nombre de usuario:</label>
            <input type="text" class="form-control" id="username" placeholder="Nombre de usuario...">
            <label for="username">Contraseña:</label>
            <input type="password" class="form-control" id="userpass" placeholder="Contraseña...">
        </div><br>
        <div class="form-group">
            <button id="botLogin" type="button" onclick="comprobarUsuario()" class="btn btn-primary">Acceder</button>
        </div>
    </form>`);
    contenido.append(formLog); // agregamos el formulario al id en el html
}

function comprobarUsuario(){
    let username = $('#username');
    let userpass = $('#userpass');
    if (username[0].value =="admin" && userpass[0].value =="admin"){
        document.cookie = 'username=admin'; // creamos la cookie
    }else{
        document.getElementById('msjInformativoUser').innerHTML = 'Usuario o contraseña incorrectos';
    }	
    cargaInicial();
}

function mostrarUsuario(){
    document.getElementById("navSecundario").innerHTML = 
        `¡Hola, admin! 
        <button onclick="generarBackup()" id="generarBackup" class="btn btn-primary">Generar Backup</button>
        <button onclick="verFavoritos()" id="verFavoritos" class="btn btn-primary">Ver Favoritos</button>
        <button onclick="desconectar()" id="botDesconectar" class="btn btn-primary">Desconectar</button>`;
}

function desconectar(){
    document.cookie = 'username=';
    document.getElementById("navSecundario").innerHTML = "";
    cargaInicial();
}

function marcaFavorito(){
    let cbFavorito = document.getElementById('cbFavorito');
    
    if (typeof(Storage) !== "undefined") {
        if (cbFavorito.checked){
            localStorage.setItem(cbFavorito.value, cbFavorito.value); // si está checkeado creo un item clave valor
        }
        else{
            localStorage.removeItem(cbFavorito.value); // si no está checkeado, lo elimino de la lista localStorage
        }        
    } else {
        document.getElementById("msjInformativo").innerHTML = "Sorry, your browser does not support web storage...";
    }
}

function verFavoritos(){
    let productos = storeHouse.getProductosAlmacen;
    let productosFavoritos = [];
    let producto = productos.next();
    while (!producto.done){
        if (localStorage.getItem(producto.value.getSerialNumber)){ // si existe en la lista el producto
            productosFavoritos.push(producto.value); // lo añado a la lista nueva
        }
        producto = productos.next();
    }
    let tablaProductos = '<br><table class="tablaCatalogo">';
    productosFavoritos.forEach(producto => {
        tablaProductos += '<tr onclick="fichaProducto('+producto.getSerialNumber+');"><td>'+ producto.getNameProduct +'</td></tr>';
    });
    tablaProductos += '</table>';
    document.getElementById('contenido').innerHTML = tablaProductos;
}
// responseText → contiene el contenido del fichero (en este caso)
function cargaDatosJSON(){
    let xhttp = new XMLHttpRequest();
    // this se refiere a xhttp
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            leerJSON(this.responseText); 
        }
    }
    xhttp.open("GET", "datosEntrada.json", true);
    xhttp.send();
}

function leerJSON(json){
        try{
        storeHouse = StoreHouse.getInstance();
        let objetoJson = JSON.parse(json); // guardo en la variable todo el json parseado
        let productos = objetoJson.productosAlmacen;
        let categorias = objetoJson.categoriasAlmacen;
        let tiendas = objetoJson.tiendasAlmacen;
        let producto;
        let categoria;
        let tienda;
        let productosTienda = [];
        for (let i = 0; i< productos.length; i++){
            switch (productos[i].clase){
                case "Coche":
                    producto = new Coche(productos[i].serialNumber, productos[i].nameProduct, productos[i].descriptionProduct, productos[i].price, productos[i].tax, productos[i].images, productos[i].categories, productos[i].type, productos[i].color, productos[i].power);
                    break;
                case "Moto":
                    producto = new Moto(productos[i].serialNumber, productos[i].nameProduct, productos[i].descriptionProduct, productos[i].price, productos[i].tax, productos[i].images, productos[i].categories, productos[i].type, productos[i].color, productos[i].power);
                    break;
                case "Bicicleta":
                    producto = new Bicicleta(productos[i].serialNumber, productos[i].nameProduct, productos[i].descriptionProduct, productos[i].price, productos[i].tax, productos[i].images, productos[i].categories, productos[i].type, productos[i].material, productos[i].size);
                    break;
            }
            storeHouse.addProduct(producto);
        }
        for (let i = 0; i<categorias.length; i++){
            categoria = new Category(categorias[i].title, categorias[i].descriptionCategory);
            storeHouse.addCategory(categoria);
        }
        for (let i = 0; i<tiendas.length; i++){
            productosTienda = []; // la reiniciamos cada vez que entramos
            for (let j = 0; j<tiendas[i].products.length; j++){
                switch (tiendas[i].products[j].clase){
                    case "Coche":
                        producto = new Coche(tiendas[i].products[j].serialNumber, tiendas[i].products[j].nameProduct, tiendas[i].products[j].descriptionProduct, tiendas[i].products[j].price, tiendas[i].products[j].tax, tiendas[i].products[j].images, tiendas[i].products[j].categories, tiendas[i].products[j].type, tiendas[i].products[j].color, tiendas[i].products[j].power);
                        break;
                    case "Moto":
                        producto = new Moto(tiendas[i].products[j].serialNumber, tiendas[i].products[j].nameProduct, tiendas[i].products[j].descriptionProduct, tiendas[i].products[j].price, tiendas[i].products[j].tax, tiendas[i].products[j].images, tiendas[i].products[j].categories, tiendas[i].products[j].type, tiendas[i].products[j].color, tiendas[i].products[j].power);
                        break;
                    case "Bicicleta":
                        producto = new Bicicleta(tiendas[i].products[j].serialNumber, tiendas[i].products[j].nameProduct, tiendas[i].products[j].descriptionProduct, tiendas[i].products[j].price, tiendas[i].products[j].tax, tiendas[i].products[j].images, tiendas[i].products[j].categories, tiendas[i].products[j].type, tiendas[i].products[j].material, tiendas[i].products[j].size);
                        break;
                }
                productosTienda.push(producto);
            }
            tienda = new Store(tiendas[i].cif, tiendas[i].nameStore, tiendas[i].adressStore, tiendas[i].phoneStore, tiendas[i].coordsStore, productosTienda, tiendas[i].stock);
            storeHouse.addShop(tienda);
        }
    }
    catch (e){
        console.log('Error: ' + e);
    }
    cargaInicial();
}

function generarBackup(){
    let backup = {
        "nombreAlmacen": storeHouse.getNombreAlmacen
    }
    // productos
    let listaProductos = [];
    let productoTransformado;
    let productos = storeHouse.getProductosAlmacen;
    let producto = productos.next();
    while (!producto.done){
        productoTransformado = {};
        productoTransformado.clase = producto.value.constructor.name;
        productoTransformado.serialNumber = producto.value.getSerialNumber;
        productoTransformado.nameProduct = producto.value.getNameProduct;
        productoTransformado.descriptionProduct = producto.value.getDescriptionProduct;
        productoTransformado.price = producto.value.getPrice;
        productoTransformado.tax = producto.value.getTax;
        productoTransformado.images = producto.value.getImages;
        productoTransformado.categories = producto.value.getCategories;
        switch (productoTransformado.clase){
            case "Coche":
                productoTransformado.type = producto.value.getType;
                productoTransformado.color = producto.value.getColor;
                productoTransformado.power = producto.value.getPower;
                break;
            case "Moto":
                productoTransformado.type = producto.value.getType;
                productoTransformado.color = producto.value.getColor;
                productoTransformado.power = producto.value.getPower;
                break;
            case "Bicicleta":
                productoTransformado.type = producto.value.getType;
                productoTransformado.material = producto.value.getMaterial;
                productoTransformado.size = producto.value.getSize;
                break;
        }
        listaProductos.push(productoTransformado);
        producto = productos.next();
    }
    backup.productosAlmacen = listaProductos;

    // categorías
    let listaCategorias = [];
    let categorias = storeHouse.getterCategories();
    let categoriaTransformada;
    categorias.forEach(cat => {
        categoriaTransformada = {};
        categoriaTransformada.title = cat.getTitle;
        categoriaTransformada.descriptionCategory = cat.getDescriptionCategory;
        listaCategorias.push(categoriaTransformada);
    });
    backup.categoriasAlmacen = listaCategorias;

    // tiendas
    let listaTiendas = [];
    let tiendas = storeHouse.getterShops();
    let tiendaTransformada;
    listaProductos = [];
    tiendas.forEach(tienda => {
        tiendaTransformada = {};
        tiendaTransformada.cif = tienda.getCif;
        tiendaTransformada.nameStore = tienda.getNameStore;
        tiendaTransformada.adressStore = tienda.getAdressStore;
        tiendaTransformada.phoneStore = tienda.getPhoneStore;
        tiendaTransformada.coordsStore = tienda.getCoordsStore;
        tienda.getProducts.forEach(producto => {
            productoTransformado = {};
            productoTransformado.clase = producto.constructor.name;
            productoTransformado.serialNumber = producto.getSerialNumber;
            productoTransformado.nameProduct = producto.getNameProduct;
            productoTransformado.descriptionProduct = producto.getDescriptionProduct;
            productoTransformado.price = producto.getPrice;
            productoTransformado.tax = producto.getTax;
            productoTransformado.images = producto.getImages;
            productoTransformado.categories = producto.getCategories;
            switch (productoTransformado.clase){
                case "Coche":
                    productoTransformado.type = producto.getType;
                    productoTransformado.color = producto.getColor;
                    productoTransformado.power = producto.getPower;
                    break;
                case "Moto":
                    productoTransformado.type = producto.getType;
                    productoTransformado.color = producto.getColor;
                    productoTransformado.power = producto.getPower;
                    break;
                case "Bicicleta":
                    productoTransformado.type = producto.getType;
                    productoTransformado.material = producto.getMaterial;
                    productoTransformado.size = producto.getSize;
                    break;
            }
            listaProductos.push(productoTransformado);
        });

        tiendaTransformada.products = listaProductos;
        tiendaTransformada.stock = tienda.getStock;
        listaTiendas.push(tiendaTransformada);
    });
    backup.tiendasAlmacen = listaTiendas;

    let xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        if (this.status == 200) {
            document.getElementById("msjInformativo").innerHTML = "Backup generado";
        }
    }
    xhttp.open("POST", "creaBackup.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("data=" + JSON.stringify(backup));
}
