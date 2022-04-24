let storeHouse; // lo declaramos como global
let myWindow = null;
let ventanasAbiertas = [];
let cargado = false;

function cargaInicial(){
    if (!cargado){
        cargaDatos()
        cargado=true;
    }
    //document.cookie = 'username='; // Borramos la cookie
    let cookie = document.cookie; // obtenemos la cookie creada en comprobarUsuario()
    document.getElementById('contenido').innerHTML = "";
    document.getElementById('msjInformativo').innerHTML = '';
    if (cookie != "username=admin"){ // si la cookie no está registrada, mostramos el formulario
        formLogin();
    }else{
        document.getElementById('msjInformativoUser').innerHTML = '';
        mostrarUsuario();
    }
    muestraTiendas(); // selección y mostrado de las tiendas disponibles
    selectTiendas();
    selectCategorias();
}

// FUNCIONES AÑADIR PRODUCTO DWEC06
function formAnadirProducto(){
    document.getElementById('msjInformativo').innerHTML = '';
    document.getElementById('msjInformativoUser').innerHTML = '';
    let categorias = storeHouse.getterCategories();
    let formProductos = "<form id='formProductosAnadir' class='formProductos'>";
    formProductos += "Tipo de producto:"
    formProductos += "<select id='selectTipoProducto' onChange='cambioTipo()'>";
        formProductos += '<option value="Coche">Coche</option>';
        formProductos += '<option value="Moto">Moto</option>';
        formProductos += '<option value="Bicicleta">Bicicleta</option>';
    formProductos += "</select><br><br>";
    formProductos += "Número de serie * :<input type='text' id='numSerie' required></input><br>";
    formProductos += "Nombre del producto * :<input type='text' id='nombreProducto' required></input><br>";
    formProductos += "Descripción:<input type='text' id='descripcionProducto'></input><br>";
    formProductos += "Precio * :<input type='number' id='precioProducto' required></input><br>";
    formProductos += "Tasa:<input type='text' id='tasaProducto'></input><br>";
    formProductos += "Imagen:<input type='file' id='imagenProducto'></input><br>";
    formProductos += "Categoria: ";
    formProductos += ' <select class="selectCategoriaAnadir" id="selectCategoriaAnadir" multiple>';
    categorias.forEach(categoria => {
        formProductos += '<option value='+ categoria.getTitle +'>' + categoria.getTitle + '</option>';
    });
    formProductos += "</select><br><br>";
    formProductos += "<div id='divTipo'>";
    formProductos += "Color:<input type='text' id='colorCoche'></input><br>";           
    formProductos += "Tipo:<input type='text' id='tipoCoche'></input><br>";           
    formProductos += "Power:<input type='text' id='powerCoche'></input><br>";
    formProductos += "</div>";
    formProductos += "</form>";
    formProductos += "<button class='botForm' onclick='anadeProducto()'>Añadir Producto</button>";
    document.getElementById('contenido').innerHTML = formProductos;
}

// función que se ejecuta en el onchange para cuando seleccionamos un tipo de producto diferente
function cambioTipo(){
    let tipoProducto = document.getElementById('selectTipoProducto').value;
    let formProductos="";

    switch(tipoProducto){
        case "Coche":
            formProductos += "Color:<input type='text' id='colorCoche'></input><br>";           
            formProductos += "Tipo:<input type='text' id='tipoCoche'></input><br>";           
            formProductos += "Power:<input type='text' id='powerCoche'></input><br>";           
            break;
        case "Moto":
            formProductos += "Tipo:<input type='text' id='tipoMoto'></input><br>";       
            formProductos += "Color:<input type='text' id='colorMoto'></input><br>";               
            formProductos += "Power:<input type='text' id='powerMoto'></input><br>";           
            break;
        case "Bicicleta":
            formProductos += "Tipo:<input type='text' id='tipoBici'></input><br>";       
            formProductos += "Material:<input type='text' id='materialBici'></input><br>";               
            formProductos += "Talla:<input type='text' id='tallaBici'></input><br>";           

            break;
        default:
            console.log("Algo está saliendo mal");
    }
    document.getElementById('divTipo').innerHTML = formProductos;
}

function anadeProducto(){
    // registro de elementos del formulario
    let tipoProducto = document.getElementById('selectTipoProducto').value;
    let numSerie = document.getElementById('numSerie');
    let nombreProducto = document.getElementById('nombreProducto');
    let descripcionProducto = document.getElementById('descripcionProducto').value;
    let precioProducto = document.getElementById('precioProducto');
    let tasaProducto = document.getElementById('tasaProducto').value;
    let imagenProducto = document.getElementById('imagenProducto').value;
    let categoria = document.getElementById('selectCategoriaAnadir');
    let categorias = categoria.options;
    let listaCategorias = []
    let error = false;
    // validación número de serie
    if (numSerie.value != ""){
        numSerie = numSerie.value;
    }
    else{    
        numSerie.style.border = "3px solid red";
        error = true;
    }
    // validación nombre de producto
    if (nombreProducto.value != ""){
        nombreProducto = nombreProducto.value;
    }
    else{    
        nombreProducto.style.border = "3px solid red";
        error = true;
    }
    // validación precio
    if (isNaN(precioProducto.value) || (precioProducto.value != "")){ // si el precio no es numérico
        precioProducto = precioProducto.value;
    }
    else{    
        precioProducto.style.border = "3px solid red";
        error = true;
    }
    if (error){
        document.getElementById('msjInformativo').innerHTML = 'Faltan campos obligatorios por rellenar';
        return false;
    }

    for (let i = 0; i < categorias.length; i++){
        if (categorias[i].selected == true){
            listaCategorias.push(categorias[i].value);
        }
    }
    let producto;
    switch(tipoProducto){
        case "Coche":
            let colorCoche = document.getElementById('colorCoche').value;
            let tipoCoche = document.getElementById('tipoCoche').value;
            let powerCoche = document.getElementById('powerCoche').value;
            producto = new Coche(numSerie, nombreProducto, descripcionProducto, precioProducto, tasaProducto, imagenProducto, listaCategorias, colorCoche, tipoCoche, powerCoche);            
            document.getElementById('msjInformativo').innerHTML = 'Producto de tipo Coche registrado correctamente';
            break;
        case "Moto":
            let tipoMoto = document.getElementById('tipoMoto').value;
            let colorMoto = document.getElementById('colorMoto').value;
            let powerMoto = document.getElementById('powerMoto').value;
            producto = new Moto(numSerie, nombreProducto, descripcionProducto, precioProducto, tasaProducto, imagenProducto, listaCategorias, tipoMoto, colorMoto, powerMoto);
            document.getElementById('msjInformativo').innerHTML = 'Producto de tipo Moto registrado correctamente';

            break;
        case "Bicicleta":
            let tipoBici = document.getElementById('tipoBici').value;
            let materialBici = document.getElementById('materialBici').value;
            let tallaBici = document.getElementById('tallaBici').value;
            producto = new Bicicleta(numSerie, nombreProducto, descripcionProducto, precioProducto, tasaProducto, imagenProducto, listaCategorias, tipoBici, materialBici, tallaBici);
            document.getElementById('msjInformativo').innerHTML = 'Producto de tipo Bicicleta registrado correctamente';
            break;
        default:
            console.log("algo esta saliendo mal");
    }
    storeHouse.addProduct(producto);
}

// FUNCIONES ELIMINAR PRODUCTO DWEC06
function formEliminarProducto(){
    document.getElementById('msjInformativo').innerHTML = '';
    document.getElementById('msjInformativoUser').innerHTML = '';
    let productos = storeHouse.getProductosAlmacen;
    let producto = productos.next();
    let selectProductos = "<select name='selectProductos' id='selectProductos'>";
    while (!producto.done){
        selectProductos += "<option value="+ producto.value.getSerialNumber +">" + producto.value.getNameProduct + "</option>";
        producto = productos.next();
    }
    selectProductos += "</select><br><br>";
    selectProductos += "<button class='botForm' onclick='eliminarProducto()'>Eliminar Producto</button>"
    document.getElementById('contenido').innerHTML = selectProductos;
}

function eliminarProducto(){
    let productoIndex = document.getElementById('selectProductos').value; // aquí guardo el serialNumber del producto
    let productosAlmacen = storeHouse.getProductosAlmacen;
    let encontrado = false;
    let producto = productosAlmacen.next();
    while (!producto.done){
        if (producto.value.getSerialNumber == productoIndex){
            encontrado = true;
            storeHouse.removeProduct(productoIndex);
            document.getElementById('msjInformativo').innerHTML = 'Producto eliminado correctamente';
        }
        producto = productosAlmacen.next();
    }
    if (!encontrado){
        console.log('El producto no se ha encontrado en el almacén');
    }
}

// FUNCIONES PARA AÑADIR Y ELIMINAR CATEGORÍAS DWEC06
function formGestionaCategoria(){
    document.getElementById('msjInformativo').innerHTML = '';
    document.getElementById('msjInformativoUser').innerHTML = '';
    let formCategoria = "<form class='formCategoria'>";
    formCategoria += 'Elige una opción para gestionar las categorías...'
    formCategoria += "<select id='eligeAccionCategoria' onChange='cambioAccionCategoria()'>";
        formCategoria += '<option value="Añadir">Añadir</option>';
        formCategoria += '<option value="Eliminar">Eliminar</option>';
    formCategoria += "</select><br><br>";
    formCategoria += "</form>"
    formCategoria += "<div id='divCategoria'>";
    formCategoria += "Título * :<input type='text' id='catIndex' required></input><br>";
    formCategoria += "Descripción:<input type='text' id='descripcionCat'></input><br>";
    formCategoria += "<button class='botForm' onclick='anadeCategoria()'>Añadir Categoría</button>";
    formCategoria += "</div>";
    
    document.getElementById('contenido').innerHTML = formCategoria;
}
// función onchange para cambiar el formulario según el usuario quiera añadir o eliminar categorías
function cambioAccionCategoria(){
    let accionElegidaCat = document.getElementById('eligeAccionCategoria').value;
    let listaCategorias = storeHouse.getterCategories();
    let formCategoria="";
    switch(accionElegidaCat){
        case "Añadir":
            document.getElementById('msjInformativo').innerHTML = '';
            document.getElementById('msjInformativoUser').innerHTML = '';
            formCategoria += "Título * :<input type='text' id='catIndex' required></input><br>";
            formCategoria += "Descripción:<input type='text' id='descripcionCat'></input><br>";
            formCategoria += "<button class='botForm' onclick='anadeCategoria()'>Añadir Categoría</button>";       
            break;
        case "Eliminar":
            document.getElementById('msjInformativo').innerHTML = '';
            document.getElementById('msjInformativoUser').innerHTML = '';
            formCategoria += "<select id='selectCategorias''>";
                listaCategorias.forEach(cat => {
                    formCategoria += '<option value="'+cat.getTitle+'">'+cat.getTitle+'</option>';
                });
            formCategoria += "</select><br>";
            formCategoria += "<button class='botForm' onclick='eliminaCategoria()'>Eliminar Categoría</button>";
    }
    document.getElementById('divCategoria').innerHTML = formCategoria;
}

function anadeCategoria(){
    document.getElementById('msjInformativo').innerHTML = '';
    document.getElementById('msjInformativoUser').innerHTML = '';
    let catIndex = document.getElementById('catIndex');
    let descripcionCat = document.getElementById('descripcionCat').value;
    // validación Título
    if (catIndex.value != ""){ 
        catIndex = catIndex.value;
    }
    else{    
        catIndex.style.border = "3px solid red";
        document.getElementById('msjInformativo').innerHTML = 'Faltan campos obligatorios por rellenar';
        return false;
    }
    let categoria = new Category(catIndex, descripcionCat);
    storeHouse.addCategory(categoria);
    document.getElementById('msjInformativo').innerHTML = 'Categoría añadida correctamente';
}

function eliminaCategoria(){
    document.getElementById('msjInformativo').innerHTML = '';
    document.getElementById('msjInformativoUser').innerHTML = '';
    let catIndex = document.getElementById('selectCategorias').value; // guardo el nombre de la categoría
    let categoriasAlmacen = storeHouse.getCategoriasAlmacen;
    let productosAlmacen = storeHouse.getProductosAlmacen;
    let encontrado = false;
    let categoria = categoriasAlmacen.next();
    let producto = productosAlmacen.next();
    while (!categoria.done){
        if (categoria.value.getTitle == catIndex){
            encontrado = true;
            storeHouse.removeCategory(catIndex);
            document.getElementById('msjInformativo').innerHTML = 'Categoría eliminada correctamente';
            while (!producto.done){
                producto.value.borraCategoria(catIndex);
                producto = productosAlmacen.next();
            }
        }
        categoria = categoriasAlmacen.next();
    }
    if (!encontrado){
        console.log('No se ha encontrado la categoría');
    }
}

// FUNCIONES PARA AÑADIR Y ELIMINAR TIENDAS DWEC06
function formGestionaTienda(){
    document.getElementById('msjInformativo').innerHTML = '';
    document.getElementById('msjInformativoUser').innerHTML = '';
    let listaProductos = storeHouse.getProductosAlmacen; //guardo los productos para recorrerlos y añadirlos al select del formulario
    let producto = listaProductos.next();
    let formTienda = "<form class='formTienda'>";
    formTienda += 'Elige una opción para gestionar las tiendas...'
    formTienda += "<select id='eligeAccionTienda' onChange='cambioAccionTienda()'>";
        formTienda += '<option value="Añadir">Añadir</option>';
        formTienda += '<option value="Eliminar">Eliminar</option>';
    formTienda += "</select><br><br>";
    formTienda += "</form>";
    formTienda += "<div id='divTienda'>"
        formTienda += "Cif * :<input type='text' id='cifTienda' required></input><br><br>";
        formTienda += "Nombre de la tienda * :<input type='text' id='nombreTienda' required></input><br><br>";
        formTienda += "Dirección:<input type='text' id='direccionTienda'></input><br><br>";
        formTienda += "Teléfono:<input type='number' id='telfTienda'></input><br><br>";
        formTienda += "Coordenadas:<input type='text' id='coordenadasTienda'></input><br><br>";
        formTienda += "<button class='botForm' onclick='anadeTienda()'>Añadir Tienda</button>";
    formTienda += "</div>";
    document.getElementById('contenido').innerHTML = formTienda;
}
function cambioAccionTienda(){
    let accionElegidaTienda = document.getElementById('eligeAccionTienda').value;
    let listaTiendas = storeHouse.getterShops();
    let formTienda="";
    switch(accionElegidaTienda){
        case "Añadir":
            document.getElementById('msjInformativo').innerHTML = '';
            document.getElementById('msjInformativoUser').innerHTML = '';
            formTienda += "Cif * :<input type='text' id='cifTienda' required></input><br><br>";
            formTienda += "Nombre de la tienda * :<input type='text' id='nombreTienda' required></input><br><br>";
            formTienda += "Dirección:<input type='text' id='direccionTienda'></input><br><br>";
            formTienda += "Teléfono:<input type='number' id='telfTienda'></input><br><br>";
            formTienda += "Coordenadas:<input type='text' id='coordenadasTienda'></input><br><br>";
            formTienda += "<button class='botForm' onclick='anadeTienda()'>Añadir Tienda</button>";    
            break;
        case "Eliminar":
            document.getElementById('msjInformativo').innerHTML = '';
            document.getElementById('msjInformativoUser').innerHTML = '';
            formTienda += "<select id='selectTiendas''>";
                listaTiendas.forEach(tienda => {
                    formTienda += '<option value="'+tienda.getCif+'">'+tienda.getNameStore+'</option>';
                });
            formTienda += "</select><br><br>";
            formTienda += "<button class='botForm' onclick='eliminaTienda()'>Eliminar Tienda</button>";
    }
    document.getElementById('divTienda').innerHTML = formTienda;
}
function anadeTienda(){
    document.getElementById('msjInformativo').innerHTML = '';
    document.getElementById('msjInformativoUser').innerHTML = '';
    // guardo los atributos del formulario en variables
    let error = false;
    let cifTienda = document.getElementById('cifTienda');
    let nombreTienda = document.getElementById('nombreTienda');
    let direccionTienda = document.getElementById('direccionTienda').value;
    let telfTienda = document.getElementById('telfTienda').value;
    let coordenadasTienda = document.getElementById('coordenadasTienda').value;

    // validación número de serie
    if (cifTienda.value != ""){
        cifTienda = cifTienda.value;
    }
    else{    
        cifTienda.style.border = "3px solid red";
        error = true;
    }
    // validación nombre de producto
    if (nombreTienda.value != ""){
        nombreTienda = nombreTienda.value;
    }
    else{    
        nombreTienda.style.border = "3px solid red";
        error = true;
    }
    if (error){
        document.getElementById('msjInformativo').innerHTML = 'Faltan campos obligatorios por rellenar';
        return false;
    }
    let tienda = new Store(cifTienda, nombreTienda, direccionTienda, telfTienda, coordenadasTienda, [], []);
    storeHouse.addShop(tienda);
    document.getElementById('msjInformativo').innerHTML = 'Tienda añadida correctamente';
}
function eliminaTienda(){
    document.getElementById('msjInformativo').innerHTML = '';
    document.getElementById('msjInformativoUser').innerHTML = '';
    let tiendaSeleccionada = document.getElementById('selectTiendas').value; // guardo el cif de la tienda
    let tiendasAlmacen = storeHouse.getTiendasAlmacen;
    let tienda = tiendasAlmacen.next();
    while (!tienda.done){
        if (tienda.value.getCif == tiendaSeleccionada){
            storeHouse.removeShop(tiendaSeleccionada);
            document.getElementById('msjInformativo').innerHTML = 'Tienda eliminada correctamente';
        }
        tienda = tiendasAlmacen.next();
    }
}
// FORMULARIO PARA GESTIONAR EL STOCK DWEC06
function formGestionaStock(){
    document.getElementById('msjInformativo').innerHTML = '';
    document.getElementById('msjInformativoUser').innerHTML = '';
    let listaTiendas = storeHouse.getterShops();
    let listaProductos = storeHouse.getProductosAlmacen;
    let formStock = "<form id='formStock'>";
        formStock += 'Elige una opción para gestionar el stock...';
        formStock += "<select id='eligeAccionStock' onChange='cambioAccionStock()'>";
            formStock += '<option value="Añadir">Añadir</option>';
            formStock += '<option value="Eliminar">Eliminar</option>';
        formStock += "</select><br>";
    formStock += "</form>";
    formStock += "<div id='divStock'>";
        formStock += "Tiendas:<select id='tiendasStock'><br><br>";
            listaTiendas.forEach(tienda => {
                formStock += '<option value="'+tienda.getCif+'">'+tienda.getNameStore+'</option>';
            });
        formStock += "</select><br><br>"; 
        formStock += "Productos:<select id='productosStock'><br><br>";
            let producto = listaProductos.next();
            while(!producto.done){
                formStock += '<option value="'+producto.value.getSerialNumber+'">'+producto.value.getNameProduct+'</option>';
                producto = listaProductos.next();
            }                
        formStock += "</select><br><br>";     
        
        formStock += "Stock * :<input type='number' id='stockTienda' required></input><br><br>";
        formStock += "<button class='botForm' onclick='anadeStock()'>Añadir stock</button>";  
    formStock += "</div>";
        document.getElementById('contenido').innerHTML = formStock;
}

function anadeStock(){
    document.getElementById('msjInformativo').innerHTML = '';
    document.getElementById('msjInformativoUser').innerHTML = '';
    let index;
    let listaTiendas = storeHouse.getterShops();
    let listaProductos = storeHouse.getProductosAlmacen;
    let tiendaIndex = document.getElementById('tiendasStock').value;
    let productoIndex = document.getElementById('productosStock').value;
    let stock = document.getElementById('stockTienda');
    let productoElegido;
    let encontrado = false;
    let producto = listaProductos.next();
    let productosTienda;
    // validación stock
    if (isNaN(stock.value) || (stock.value != "")){ // si el stock no es numérico o está vacío
        stock = stock.value;
    }
    else{    
        stock.style.border = "3px solid red";
        document.getElementById('msjInformativo').innerHTML = 'Faltan campos obligatorios por rellenar';
        return false;
    }
    while(!producto.done){ // recorro los productos
        if (producto.value.getSerialNumber == productoIndex){
            productoElegido = producto.value; // introduzco el objeto entero en la variable
        }
        producto = listaProductos.next();
    } 
    listaTiendas.forEach(tienda => { // recorro las tiendas
        if (tiendaIndex == tienda.getCif){
            productosTienda = tienda.getProducts;
            for (let i = 0; i<productosTienda.lenth; i++){ // recorro los productos de una tienda específica
                if (productosTienda[i].getCif == productoIndex){
                    encontrado = true;
                    index = i;
                }
            }
            if (!encontrado){ // si no se ha encontrado → se inserta un nuevo producto y su stock
                tienda.insertarProducto(productoElegido, stock);
                document.getElementById('msjInformativo').innerHTML = 'Producto añadido correctamente';
            }
            else{ // si se encuentra → añadimos al stock la cantidad indicada
                tienda.anadirStock(index, stock);
                document.getElementById('msjInformativo').innerHTML = 'Stock añadido correctamente';
            }
        }
    });
}

function cambioAccionStock(){
    let accionElegidaStock = document.getElementById('eligeAccionStock').value;
    let listaTiendas = storeHouse.getterShops();
    let formStock="";
    let tienda1="";
    let primera = true;
    let listaProductos = storeHouse.getProductosAlmacen;
    switch(accionElegidaStock){
        case "Añadir":
            formStock += "Tiendas:<select id='tiendasStock'><br><br>";
            listaTiendas.forEach(tienda => {
                if(primera){
                    primera = false;
                    tienda1=tienda;
                }
                formStock += '<option value="'+tienda.getCif+'">'+tienda.getNameStore+'</option>';
            });
            formStock += "</select><br><br>"; 
            formStock += "Productos:<select id='productosStock'><br><br>";
            let producto = listaProductos.next();
            while(!producto.done){
                formStock += '<option value="'+producto.value.getSerialNumber+'">'+producto.value.getNameProduct+'</option>';
                producto = listaProductos.next();
            }                
            formStock += "</select><br><br>";       
            formStock += "Stock:<input type='number' id='stockTienda'></input><br><br>";
            formStock += "<button class='botForm' onclick='anadeStock()'>Añadir stock</button>";    
            break;
        case "Eliminar":
            formStock += "Tiendas:<select id='tiendasStock' onChange='cambiaTiendasProductos()'><br><br>";
            listaTiendas.forEach(tienda => {
                if(primera){
                    primera = false;
                    tienda1=tienda;
                }
                formStock += '<option value="'+tienda.getCif+'">'+tienda.getNameStore+'</option>';
            });
            formStock += "</select><br><br>";   
            formStock += "Productos:<select id='productosStock'><br><br>";
            listaProductos = tienda1.getProducts;
            listaProductos.forEach(producto => {
                formStock += '<option value="'+producto.getSerialNumber+'">'+producto.getNameProduct+'</option>';
            });
            formStock += "</select><br><br>";   
            formStock += "<button  class='botForm' onclick='eliminaStock()'>Eliminar stock</button>";       
    }
    document.getElementById('divStock').innerHTML = formStock;
}
function eliminaStock(){
    document.getElementById('msjInformativo').innerHTML = '';
    document.getElementById('msjInformativoUser').innerHTML = '';
    let tiendaIndex = document.getElementById('tiendasStock').value;
    let productoIndex = document.getElementById('productosStock').value;
    let listaTiendas = storeHouse.getterShops();
    listaTiendas.forEach(tienda => { // recorro las tiendas
        if (tienda.getCif == tiendaIndex){
            tienda.eliminarProducto(productoIndex);
            document.getElementById('msjInformativo').innerHTML = 'Producto eliminado correctamente';
        }
    });
}

function cambiaTiendasProductos(){
    document.getElementById('msjInformativo').innerHTML = '';
    document.getElementById('msjInformativoUser').innerHTML = '';
    let listaTiendas = storeHouse.getterShops();
    let accionElegidaTiendaStock = document.getElementById('tiendasStock').value;
    let listaProductos = []; 
    let options= "";
    listaTiendas.forEach(tienda => { // recorro cada tienda
        if (accionElegidaTiendaStock == tienda.getCif){
            listaProductos = tienda.getProducts;
            listaProductos.forEach(producto => {
                options += '<option value="'+producto.getSerialNumber+'">'+producto.getNameProduct+'</option>';
            });
        }
    });
    document.getElementById("productosStock").innerHTML = options;
            
}

function muestraTiendas(){
    let tiendas = storeHouse.getterShops();
    let tablaTiendas = "<br></brZ><p>Buscar por tienda...</p>"
    tablaTiendas += "<br><table class='tablaTiendas tablaCatalogo'><tr>";
    tiendas.forEach(tienda => {
        tablaTiendas += "<td onclick='catalogoTienda("+ tienda.getCif +");'>" + tienda.getNameStore + "</td>";
    });
    tablaTiendas += "</tr></table><br><br>";
    document.getElementById('contenido').innerHTML += tablaTiendas;
}

function selectTiendas(){
    let tiendas = storeHouse.getterShops();
    let selectTiendas = "<p>Buscar por tienda o categoría...</p>"
    selectTiendas += "<select name='seleccionTiendas' id='seleccionTiendas'>";
    tiendas.forEach(tienda => {
        selectTiendas += "<option value="+ tienda.getCif +">" + tienda.getNameStore + "</option>";
    });
    selectTiendas += "</select>";
    selectTiendas += "<button class='botFormPrincipal' onclick='seleccionTiendas();'>Ir a tienda</button>";
    
    document.getElementById('contenido').innerHTML += selectTiendas;
} 

function seleccionTiendas(){
    let encontrado = false;
    let tiendas = storeHouse.getterShops();
    let tiendaSeleccionada = document.getElementById('seleccionTiendas').value;
    tiendas.forEach(tienda => {
        if (tienda.getCif == tiendaSeleccionada){
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
    let selectCategorias = "<select name='seleccionCategorias' id='seleccionCategorias'>";
    categorias.forEach(categoria => {
        selectCategorias += "<option>" + categoria.getTitle + "</option>";
    });
    selectCategorias += "</select>";
    selectCategorias += "<button class='botFormPrincipal' onclick='seleccionCategorias();'>Ir a categoría</button>";
    document.getElementById('contenido').innerHTML += selectCategorias;
}

function seleccionCategorias(){
    categoriaSeleccionada = document.getElementById('seleccionCategorias').value;
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

    let tablaProductos = '<br><table class="tablaCatalogo">';
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
    let tablaProductos = '<br><table class="tablaProductos tablaCatalogo">';
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
    // comprobación para establecer favoritos DWEC07
    if (document.cookie == 'username=admin'){ // si la cookie contiene el usuario admin
        let checkeado = "";
        if (typeof(Storage) !== "undefined") {
            if (localStorage.getItem(productoImpreso.getSerialNumber)) { // si existe en la lista de favoritos de localStorage, lo checkeamos (mantenimiento del check)
                checkeado = "checked";                
            }
        } else {
            document.getElementById("msjInformativo").innerHTML = "Sorry, your browser does not support web storage...";
        }
        productoSacado += `<br><input type="checkbox" id="cbFavorito" name="cbFavorito" onChange="marcaFavorito()" value=`+productoImpreso.getSerialNumber+` `+checkeado+`>
        <label for="cbFavorito">Favorito</label>`;
    }
    productoSacado += "<br><button onclick='nuevaVentana();'>Abrir en una nueva ventana</button>";
    productoSacado += "<br><button onclick='cierraVentana();'>Cerrar ventana</button>";
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