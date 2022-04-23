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

function mostrarDesconectar(){
    document.getElementById("navSecundario").innerHTML = '¡Hola, admin! <button onclick="desconectar()" id="botDesconectar" class="btn btn-primary">Desconectar</button>';
}

function desconectar(){
    document.cookie = 'username=';
    document.getElementById("navSecundario").innerHTML = "";
    cargaInicial();
}