
const seccionInicioJuego = document.getElementById('seccion-inicio');
const seccionRegistro = document.querySelector(".seccion-registro");
const seccionInicio = document.querySelector(".formulario-inicio");
const linkRegistro = document.getElementById('linkregistro')
const linkInicio = document.getElementById('linkinicio')
const formInicio = document.getElementById('form-inicio');
const formRegistro = document.getElementById('form-registro');

const seccionperfil = document.getElementById('secperfil');
const seccionResultado = document.getElementById('secresultados')
const botonResultado = document.querySelector('#calificacionesboton')
const botonCerrarMenu = document.querySelector('#btn-cerrar')
const linkCerrarSesion = document.getElementById('cerrar-sesion')
const botonIniciar = document.getElementById('btn-start');
const botonInstrucciones = document.getElementById('instruccionesboton')
const botonPerfil = document.querySelector('#perfilboton')
const seccionInstrucciones = document.getElementById('secinstrucciones');







botonPerfil.addEventListener('click', e=>{
    
    seccionperfil.style.display = "block";
    seccionResultado.style.display = "none";
    seccionInstrucciones.style.display = "none";



})


//Funcion que te lleva a la seccion resultado
botonResultado.addEventListener('click', e=>{
    seccionperfil.style.display = "none";
    seccionResultado.style.display = "block";
    seccionInstrucciones.style.display = "none";
})

//Funcion que te lleva a la seccion instrucciones
botonInstrucciones.addEventListener('click', e=>{
    seccionInstrucciones.style.display = "block";
    seccionperfil.style.display = "none";
    seccionResultado.style.display = "none";
})

//Funcion que cierra el menu
botonCerrarMenu.addEventListener('click', e=>{
    seccionperfil.style.display = "none";
    seccionResultado.style.display = "none";
    seccionInstrucciones.style.display = "none";
})


