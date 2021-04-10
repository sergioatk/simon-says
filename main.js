const $cuadros = document.querySelectorAll('.cuadro');
const $botonEmpezar = document.querySelector('button');


let secuenciaMaquina = [];
let secuenciaUsuario = [];
let ronda = 0;



$botonEmpezar.onclick = empezarPartida;

function empezarPartida() {
    desactivarInputUsuario();
    ronda = 0;
    cambiarCartelTurno(ronda);
    
    secuenciaMaquina = [];
    secuenciaUsuario = [];

    
    
    turnoMaquina();
    
}




function resaltar(square) {
    
    square.style.opacity = '100%';
    
    setTimeout(function() {
        square.style.opacity = '75%';
    }, 500)
}

function desactivarInputUsuario() {
    $cuadros.forEach(function($cuadro, i) {
        $cuadro.onclick = function() {
            
        };
    });
}

function activarInputUsuario() {

    $cuadros.forEach(function($cuadro, i) {
        $cuadro.onclick = seleccionarNuevoCuadro;
    });

    
}

function turnoMaquina() {

    ronda++;

    cambiarCartelTurno(ronda);

    const nuevoCuadro = obtenerNuevoCuadro();
    
    

    secuenciaMaquina.push(nuevoCuadro);

  

    const RETRASO_TURNO_USUARIO = (secuenciaMaquina.length + 1) * 1000;

    

    secuenciaMaquina.forEach(function(cuadro, i) {

        const retardoResaltado = (1000 * (i + 1));

        

        setTimeout(function() {
            resaltar(cuadro)
        }, retardoResaltado);


    })

    setTimeout(function() {
        turnoUsuario();
    }, RETRASO_TURNO_USUARIO);
    

    
    
    
    
}

function turnoUsuario() {
    secuenciaUsuario = [];

    activarInputUsuario();

    
    
    
}

function obtenerNuevoCuadro() {
    const nuevoCuadro = $cuadros[Math.floor(Math.random() * $cuadros.length)];

    return nuevoCuadro;
    
}

function cambiarCartelTurno(ronda) {
    const $cartelStatus = document.querySelector('span');

    $cartelStatus.textContent = ronda;
   
}

function seleccionarNuevoCuadro(e) {
    const nuevoCuadro = e.target;

    secuenciaUsuario.push(nuevoCuadro);

    resaltar(nuevoCuadro);

    const cuadroMaquinaAComparar = secuenciaMaquina[secuenciaUsuario.length - 1];

    

   

    if (nuevoCuadro.id !== cuadroMaquinaAComparar.id) {
        
        perder();
        return;
    }
    
    if (secuenciaUsuario.length === secuenciaMaquina.length) {
        desactivarInputUsuario();
        setTimeout(turnoMaquina, 1000);
    }

    
    
}

function perder() {
    desactivarInputUsuario();
    bannerPerdedor();   
    secuenciaMaquina = [];
    secuenciaUsuario = [];
    
}

function bannerPerdedor() {
    const banner = document.querySelector('.alert');
    const mensajeEmpezar = banner.textContent;

    console.log(mensajeEmpezar);
    
    banner.classList.remove('alert-succes');
    banner.classList.add('alert-danger');
    banner.textContent = 'PERDISTE';

    setTimeout(function() {
        banner.classList.remove('alert-danger');
        banner.classList.add('alert-success');
        banner.textContent = mensajeEmpezar;
    }, 3000)
}



