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