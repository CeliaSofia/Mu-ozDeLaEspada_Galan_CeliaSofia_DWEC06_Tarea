let storeHouse; // lo declaramos como global
let myWindow = null;
let ventanasAbiertas = [];
let url = window.location.pathname;
let indice = url.lastIndexOf('/');
url= url.slice(0,indice);

function cargaInicial(){
    cargaDatos(); // Creamos los datos que va a tener nuestra página
    muestraTiendas(); // selección y mostrado de las tiendas disponibles
    selectTiendas();
    selectCategorias();
    return storeHouse;
}


function muestraTiendas(){
    let tiendas = storeHouse.getterShops();
    let tablaTiendas = "<br><table class='tablaTiendas'><tr>";
    tiendas.forEach(tienda => {
        tablaTiendas += "<td onclick='catalogoTienda("+ tienda.getCif +");'>" + tienda.getNameStore + "</td>";
    });
    tablaTiendas += "</tr></table>";
    document.getElementById('contenido').innerHTML = tablaTiendas;
}

function selectTiendas(){
    let tiendas = storeHouse.getterShops();
    let selectTiendas = "<select name='selectTiendas' id='selectTiendas'>";
    tiendas.forEach(tienda => {
        selectTiendas += "<option value="+ tienda.getCif +">" + tienda.getNameStore + "</option>";
    });
    selectTiendas += "</select>";
    selectTiendas += "<button onclick='seleccionTiendas();'>Ir a tienda</button>";
    
    document.getElementById('header').innerHTML += selectTiendas;
} 

function seleccionTiendas(){
    let encontrado = false;
    let tiendas = storeHouse.getterShops();
    let tiendaSeleccionada = document.getElementById('selectTiendas').value;
    tiendas.forEach(tienda => {
        if (tienda.getCif == tiendaSeleccionada){
            history.pushState(tiendaSeleccionada, tiendaSeleccionada, url+ '/' + tienda.getNameStore)
            encontrado = true;
        }
    });
    if(!encontrado){
        console.log('La tienda no existe o no se ha seleccionado');
    }
    catalogoTienda(tiendaSeleccionada);
}

function selectCategorias(){
    let categorias = storeHouse.getterCategories();
    let selectCategorias = "<select name='selectCategorias' id='selectCategorias'>";
    categorias.forEach(categoria => {
        selectCategorias += "<option>" + categoria.getTitle + "</option>";
    });
    selectCategorias += "</select>";
    selectCategorias += "<button onclick='seleccionCategorias();'>Ir a categoría</button>";
    document.getElementById('header').innerHTML += selectCategorias;
}

function seleccionCategorias(){
    categoriaSeleccionada = document.getElementById('selectCategorias').value;
    history.pushState(categoriaSeleccionada, categoriaSeleccionada, url+ '/' + categoriaSeleccionada)
    catalogoCategoria(categoriaSeleccionada);
}

function catalogoCategoria(title){
    let productos = storeHouse.getProductosAlmacen;
    let productosFinal = [];
    let producto = productos.next();
    while (!producto.done){
        producto.value.getCategories.forEach(categoria => {
            if (categoria == title){
                productosFinal.push(producto.value);
            }
        });
        producto = productos.next();
    }

    let tablaProductos = '<br><table>';
    productosFinal.forEach(producto => {
        tablaProductos += '<tr onclick="fichaProducto('+producto.getSerialNumber+');"><td>'+ producto.getNameProduct +'</td></tr>';
    });
    tablaProductos += '</table>';
    document.getElementById('contenido').innerHTML = tablaProductos;
}

function catalogoTienda(cif){
    let _categoriasTienda = new Map();
    let tiendas = storeHouse.getterShops();
    let productosTienda;
    tiendas.forEach(elem => {
        if (elem.getCif == cif){
            history.pushState(elem.getNameStore, elem.getNameStore, url+ '/' + elem.getNameStore)
            productosTienda = elem.getProducts;
        }
    });
    productosTienda.forEach(producto => { // recorremos los productos de la tienda
        producto.getCategories.forEach(categoria => { // recorremos las categorías de los productos
            if(_categoriasTienda.has(categoria)){ // si la lista de categorías ya tiene la categoría
                let listaProductos = _categoriasTienda.get(categoria); // obtenemos la lista de productos de esta categoría
                listaProductos.push(producto) // añadimos a la lista el producto actual
                _categoriasTienda.set(categoria, listaProductos); // sustituimos la lista anterior por la lista con el producto incluido
            }
            else{
                _categoriasTienda.set(categoria, [producto]); // si la categoría no está, la introducimos junto con el producto
            }
        });
    });
    let tablaProductos = '<br><table class="tablaProductos">';
    for (var [categoria, productos] of _categoriasTienda){ // recorro el map cogiendo la clave y valor
        tablaProductos += '<tr><th>'+ categoria +'</th>';
        productos.forEach(producto => {
            tablaProductos += '<td onclick="fichaProducto('+producto.getSerialNumber+');">'+ producto.getNameProduct +'</td>';
        });
        tablaProductos += '</tr>';
    }
    tablaProductos += '</table>';
    document.getElementById('contenido').innerHTML = tablaProductos;
}

function fichaProducto(serialNumber){
    let productos = storeHouse.getProductosAlmacen;
    let productoImpreso;
    let producto = productos.next();
    while (!producto.done){
        if (producto.value.getSerialNumber == serialNumber){
            productoImpreso = producto.value;
        }
        producto = productos.next();
    }
    let productoSacado="";
    if (productoImpreso instanceof Coche){
        productoSacado = 'El producto de tipo: ' + productoImpreso.constructor.name + '<br>'
                        + ' Nombre: ' + productoImpreso.getNameProduct + '<br>'
                        + ' color: ' + productoImpreso.getColor + ' power: ' + productoImpreso.getPower + '<br>'
                        + ' precio: ' + productoImpreso.getPrice + ' Número de serie: ' 
                        + productoImpreso.getSerialNumber + ' Tasa: ' + productoImpreso.getTax + '<br>'
                        + ' Tipo: ' + productoImpreso.getType;
    }
    else if(productoImpreso instanceof Moto){
        productoSacado = 'El producto de tipo: ' + productoImpreso.constructor.name + '<br>'
                        + ' Nombre: ' + productoImpreso.getNameProduct + '<br>'
                        + ' color: ' + productoImpreso.getColor + '<br>'
                        + ' precio: ' + productoImpreso.getPrice + ' Número de serie: ' 
                        + productoImpreso.getSerialNumber + ' Tasa: ' + productoImpreso.getTax + '<br>'
                        + ' Tipo: ' + productoImpreso.getType;
    }
    else if(productoImpreso instanceof Bicicleta){
        productoSacado = 'El producto de tipo: ' + productoImpreso.constructor.name + '<br>'
                        + ' Nombre: ' + productoImpreso.getNameProduct + '<br>'
                        + ' tamaño: ' + productoImpreso.getSize + '<br>'
                        + ' precio: ' + productoImpreso.getPrice + ' Número de serie: ' 
                        + productoImpreso.getSerialNumber + ' Material: ' + productoImpreso.getMaterial + '<br>'
                        + ' Tipo: ' + productoImpreso.getType;
    }
    document.getElementById('botonAbrir').innerHTML = "<br><button onclick='nuevaVentana();'>Abrir en una nueva ventana</button>";
    document.getElementById('botonCerrar').innerHTML = "<br><button onclick='cierraVentana();'>Cerrar ventana</button>";
    document.getElementById('contenido').innerHTML = productoSacado;
}

function nuevaVentana(){
    myWindow = null;
    let producto = document.getElementById("contenido").textContent;
    console.log(producto);
    // cada producto en una nueva ventana
    myWindow = window.open("paginaAuxiliar.html", producto,
    "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no");
    ventanasAbiertas.push(myWindow);
    
    setTimeout(() =>{myWindow.establecerMensaje(producto);}, 3000);
}

function cierraVentana(){
    if (ventanasAbiertas.length > 0){
        ventanasAbiertas.forEach(myWindow => {
            if (myWindow && !(myWindow.closed)){ // si la ventana está creada y no está cerrada
                myWindow.close();
                console.log('Se ha cerrado la ventana');
            }
            else{
                console.log('La ventana está cerrada');
            }
        });
    }else{
        console.log('No hay ventanas abiertas');
    }
}

function cargaDatos(){
    _stores = [];
    _categories = [];
    // Creación de objetos de la clase Category
    let gasolina = new Category('gasolina', 'descripcion1');
    let diesel = new Category('diesel', 'descripcion2');
    let electrico = new Category('electrico', 'descripcion3');
    let carretera = new Category('carretera', 'descripcion4');
    let ciudad = new Category('ciudad', 'descripcion5');

    // Lo añadimos a la lista _categories
    _categories.push(gasolina);
    _categories.push(diesel);
    _categories.push(electrico);
    _categories.push(carretera);
    _categories.push(ciudad);

    // Creación de productos
    try{
        var audi = new Coche('111', 'Audi', 'A4', 30000, 20, 'imagen', [diesel.getTitle], 'Berlina', 'rojo', 140);
        var toyota = new Coche('222', 'Toyota', 'Prius', 37000, 20, 'imagen', [gasolina.getTitle, electrico.getTitle], 'Monovolumen', 'azul', 160);
        var yamaha = new Moto('333', 'Yamaha', 'YZF-R1', 935, 5, 'imagen', [gasolina.getTitle, carretera.getTitle], 'Naked', 'negro', 120);
        var BMC = new Bicicleta('444', 'BMC', 'TE01', 5000, 5, 'imagen', [electrico.getTitle, ciudad.getTitle], 'Montaña', 'negro', 120);
        var orbea = new Bicicleta('555', 'orbea', 'MX', 495, 1, 'imagen', [gasolina.getTitle, ciudad.getTitle], 'Montaña', 'gris', 120);
        var trek = new Bicicleta('666', 'trek', 'MTB', 500, 1, 'imagen', [electrico.getTitle, gasolina.getTitle, ciudad.getTitle], 'Ciudad', 'rojo', 120);
        var honda = new Moto('777', 'honda', 'MK2', 754, 2, 'imagen', [electrico.getTitle, carretera.getTitle, ciudad.getTitle], 'Naked', 'gris oscuro', 120);
        var suzuki = new Moto('888', 'suzuki', 'M9', 519, 2, 'imagen', [carretera.getTitle, ciudad.getTitle], 'Naked', 'amarillo', 120);
        var fiat = new Coche('999', 'fiat', '500', 55000, 20, 'imagen', [gasolina.getTitle, electrico.getTitle], 'Monovolumen', 'blanco', 160);
    }
    catch (e){
        console.log('Error: ' + e);
    }
    
    // Creación de objetos de la clase Coords
    let madrid = new Coords('40.4165', '-3.70256');
    let barcelona = new Coords('41.38879', '2.15899');
    let valencia = new Coords('39.46975', '-0.37739');
    // Creación de los objetos de la clase Store
    let automotorShop = new Store('111', 'automotor', 'madrid', 69999999, madrid, [toyota, audi, fiat, suzuki, orbea], [23, 12, 65, 11, 82]);
    let autobildShop = new Store('112', 'autobild', 'barcelona', 698745878, barcelona, [audi, yamaha, honda, trek, suzuki], [12, 44, 9, 11, 22]);
    let soloautosShop = new Store('113', 'soloautos', 'valencia', 666555879, valencia, [toyota, BMC, trek, fiat, orbea], [12, 55, 23, 13, 32]);

     // Lo añadimos a la lista _stores
    _stores.push(automotorShop);
    _stores.push(autobildShop);
    _stores.push(soloautosShop);

    try {
        storeHouse = StoreHouse.getInstance();
        // añadimos los productos
        storeHouse.addProduct(audi);
        storeHouse.addProduct(toyota);
        storeHouse.addProduct(yamaha);
        storeHouse.addProduct(BMC);
        storeHouse.addProduct(orbea);
        storeHouse.addProduct(trek);
        storeHouse.addProduct(honda);
        storeHouse.addProduct(suzuki);
        storeHouse.addProduct(fiat);

        // añadimos las categorías
        storeHouse.addCategory(gasolina);
        storeHouse.addCategory(diesel);
        storeHouse.addCategory(electrico);
        storeHouse.addCategory(ciudad);
        storeHouse.addCategory(carretera);

        // añadimos las tiendas
        storeHouse.addShop(automotorShop);
        storeHouse.addShop(autobildShop);
        storeHouse.addShop(soloautosShop);
    }
    catch (e){
        console.log('No se ha podido crear el almacén, error: ' + e);
    }
}