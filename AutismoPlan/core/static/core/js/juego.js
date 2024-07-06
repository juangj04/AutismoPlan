const timer = document.getElementById('timer');
let tiempo = 5;
let idInterval = null;
const botonInvisible = document.getElementById('btn-invisible');
const botonIniciarPausar = document.getElementById('start-pause');
const botonGuardar = document.querySelector('.btn-save')
const resultado = document.getElementById('resultado');
const textoEstado = document.getElementById('estado')
const contenedorCocina = document.getElementById('contenedorcocina');
const contenedorBaño = document.getElementById('contenedorbaño');
let items = document.getElementsByClassName('item');
let rightBox = document.getElementById('right');
let leftBox = document.getElementById('kakak');
let puntaje = 0;
let elementosColocados = {
    cocina: 0,
    baño: 0,
    sala: 0,
    habitacion: 0,
};
let tiempoAgotado = false;  
puntuacion= document.getElementById('puntuacion')
testado= document.getElementById('estadoo')
rightBox.style.display = 'none';
leftBox.style.display = 'none';
lamparaElement = document.getElementById('lampara')
juego = document.getElementById('juego')
// Contenedores Imagenes
const contenedorImagenes = [
    document.getElementById('imagen1'), //0
    document.getElementById('imagen2'), // 1
    document.getElementById('imagen3'), // 2
    document.getElementById('imagen4'), // 3
    document.getElementById('imagen5'), // 4
    document.getElementById('imagen6'), // 5
    document.getElementById('imagen7'), // 6
    document.getElementById('imagen8'), // 7
    document.getElementById('imagen9'), // 8
    document.getElementById('imagen10'), // 9
    document.getElementById('imagen11'), // 10
    document.getElementById('imagen12'), // 11
    document.getElementById('imagen13'), // 11
    document.getElementById('imagen14'), // 11
    document.getElementById('imagen15'), // 11
    document.getElementById('imagen16'), // 11
];
function actualizarBordesContenedores() {
    contenedorImagenes.forEach(contenedor => {
        const tieneElementoCorrecto = contenedor.querySelector('.elemento-correcto');
        const tieneElementoIncorrecto = contenedor.querySelector('.elemento-incorrecto');

        if (tieneElementoCorrecto) {
            contenedor.style.border = '1px solid green'; // Borde verde para elementos correctos
        } else if (tieneElementoIncorrecto) {
            contenedor.style.border = '1px solid red'; // Borde rojo para elementos incorrectos
        } else {
            contenedor.style.border = 'none'; // Sin borde para contenedores vacíos
        }
    });
}

let posicionesOriginales = {}
for (let item of items) {
    const clase = item.classList[1]; 
    posicionesOriginales[clase] = item.parentElement; 
}

let seleccionado = null;
const audioApurate = new Audio('/static/core/sounds/acabatiempo.mp3')

const cuentaRegresiva = () => {
    tiempo -= 1;
    if(tiempo == 11){
        audioApurate.play()
    }
    if (tiempo < 0) {
        audioApurate.pause()
        reiniciar();
        mostrarResultado()
        botonGuardar.style.display= 'block'
        resultado.innerHTML = 'Tiempo Agotado';
        botonInvisible.style.display = 'block';
        botonIniciarPausar.style.display = 'none'
        resultado.innerHTML = `<strong>¡Juego Terminado!</strong> Puntaje total: ${puntaje} <br>
    `
        if (puntaje > 6 && puntaje <16){
            textoEstado.innerHTML = `<b>Ganaste!</b>`
        }
        else if(puntaje==16){
            textoEstado.innerHTML = `<b>Ganaste! No fallaste ninguna!</b>`
        }
        else{
            textoEstado.innerHTML = `<b>Perdiste sigue intentando</b>`
        }

        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            item.setAttribute('draggable', 'false');
        }
        actualizarCamposFormulario()
        actualizarBordesContenedores();
        contenedorImagenes.forEach((contenedor) => {
            contenedor.style.border = 'none'
        });
        timer.style.display = 'none'
        tiempoAgotado = true; 
        return;
    }
    mostrarTiempo();
    timer.style.display = 'block'
}

function iniciarPausar() {
    if (idInterval) {
        leftBox.style.display = 'none';
        audioApurate.pause()
        reiniciar();
        return;
    }
    juego.style.display = 'flex'
    rightBox.style.display = 'flex';
    leftBox.style.display = 'flex';
    botonIniciarPausar.textContent = "Pausar Juego";
    idInterval = setInterval(cuentaRegresiva, 1000);
}

function reiniciar() {
    clearInterval(idInterval);
    idInterval = null;
    botonIniciarPausar.textContent = "Continuar Juego";
    puntuacion.value = 0
    testado.value = ''
    botonGuardar.style.display = 'none'
    tiempoAgotado = false;
    timer.style.display = 'none'
    return
}

function mostrarResultado() {
    const resultadoHtml = `
        <strong>¡Juego Terminado!</strong><br>
        Puntaje total: ${puntaje}<br>
        Elementos Correctos Sala: ${elementosColocados.sala}<br>
        Elementos Correctos Baño: ${elementosColocados.baño}<br>
        Elementos Correctos Habitacion: ${elementosColocados.habitacion}<br>
        Elementos Correctos Cocina: ${elementosColocados.cocina}<br>
    `;
    let mensajeEstado = '';
    if (puntaje > 6 && puntaje < 16) {
        mensajeEstado = 'Ganaste!';
    } else if (puntaje == 16) {
        mensajeEstado = 'Ganaste! No fallaste ninguna!';
    } else {
        mensajeEstado = 'Perdiste sigue intentando';
    }

    Swal.fire({
        title: '¡Juego Terminado!',
        html: `${resultadoHtml}<br><b>${mensajeEstado}</b>`,
        icon: 'info',
        confirmButtonText: 'Aceptar'
    });

    botonGuardar.style.display = 'block';
    botonInvisible.style.display = 'block';
    botonIniciarPausar.style.display = 'none';
}

function mostrarTiempo() {
    timer.innerHTML = `Tiempo Restante: ${tiempo} segundos`;

}

botonIniciarPausar.addEventListener('click', iniciarPausar);

// Juego
for (let item of items) {
    item.addEventListener('dragstart', function (e) {
        seleccionado = e.target; // Establecer el elemento arrastrado
    });
}

contenedorImagenes.forEach((contenedor, index) => { //Index es la posicion en el arreglo donde esta el contenedor
    contenedor.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    contenedor.addEventListener('drop', function (e) {
        e.preventDefault();
         if (tiempoAgotado) {
            // Si el tiempo se ha agotado, no permitir dropear
            return;}
        if (seleccionado) {
            contenedor.appendChild(seleccionado);
            seleccionado.classList.add('ocupando');
            seleccionado.setAttribute('draggable', 'false'); // Deshabilitar el arrastre
            let audioError = new Audio('/static/core/sounds/error.mp3');
            audioError.play();
            contenedor.style.border = 'none'
            seleccionado.classList.add('elemento-incorrecto');

            if (index < 4) {
                if (seleccionado.classList.contains(`sala${index + 1}`)) {
                    seleccionado.classList.remove('elemento-incorrecto')
                    seleccionado.classList.add('elemento-correcto');
                    audioError.pause()
                    let audio = new Audio('/static/core/sounds/success.mp3');
                    audio.play();
                    elementosColocados.sala++;
                }
            } else if(index >= 4 && index < 8) {
                if (seleccionado.classList.contains(`baño${index - 3}`)) {
                    seleccionado.classList.remove('elemento-incorrecto')
                    seleccionado.classList.add('elemento-correcto');
                    audioError.pause()
                    let audio = new Audio('/static/core/sounds/success.mp3');
                    audio.play();
                    elementosColocados.baño++;
                }
            } else if(index >= 8 && index < 12) {
                if (seleccionado.classList.contains(`hab${index - 7}`)) {
                    seleccionado.classList.remove('elemento-incorrecto')
                    seleccionado.classList.add('elemento-correcto');
                    audioError.pause()
                    let audio = new Audio('/static/core/sounds/success.mp3');
                    audio.play();
                    elementosColocados.habitacion++;
                    if (index == 11) {
                        lamparaElement.classList.add('lampara')
                    }
                }
            } else {
                if (seleccionado.classList.contains(`coc${index - 11}`)) {
                    seleccionado.classList.remove('elemento-incorrecto')
                    seleccionado.classList.add('elemento-correcto');
                    audioError.pause()
                    let audio = new Audio('/static/core/sounds/success.mp3');
                    audio.play();
                    elementosColocados.cocina++;
                }
            }
            seleccionado.classList.add('colocado');
            actualizarPuntaje();
            verificarFinJuego();
            
        }
    });
});

function actualizarPuntaje() {
    puntaje = elementosColocados.cocina + elementosColocados.baño + elementosColocados.sala + elementosColocados.habitacion;
    resultado.innerHTML = `Acertadas: ${puntaje}`;
}

function verificarFinJuego() {
    let totalItems = items.length;
    let itemsColocados = document.querySelectorAll('.item.colocado').length;

    if (itemsColocados === totalItems) {
        actualizarBordesContenedores();
        contenedorImagenes.forEach((contenedor) => {    
            contenedor.style.border = 'none'
        });
        
        audioApurate.pause()
        botonGuardar.style.display = 'block'
        clearInterval(idInterval);
        idInterval = null;
        mostrarResultado()
        botonIniciarPausar.style.display = 'none'
        resultado.innerHTML = `<strong>¡Juego Terminado!</strong> Puntaje total: ${puntaje} <br>
    `
        
        // botonInvisible.style.display = 'block';
        if (puntaje > 6 && puntaje < 16){
            textoEstado.textContent = 'Ganaste!'
        } else if(puntaje == 16){
            textoEstado.textContent = 'Ganaste! No fallaste ninguna!'
        } else {
            textoEstado.textContent = 'Perdiste sigue intentando'
        }

        for (let item of items) {
            item.setAttribute('draggable', 'false');
        }
        actualizarCamposFormulario()
        leftBox.style.display = 'none'
        
    }
}

function reiniciarJuego() {
    timer.style.display = 'none'
    tiempo = 60;
    puntaje = 0;
    elementosColocados = { cocina: 0, baño: 0, sala: 0, habitacion: 0 };

    clearInterval(idInterval);
    idInterval = null;

    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        if (item.classList.contains('colocado')) {
            const clase = item.classList[1];
            posicionesOriginales[clase].appendChild(item); 
            item.classList.remove('colocado');
            item.classList.remove('ocupando');
            item.classList.remove('elemento-correcto')
            item.classList.remove('elemento-incorrecto')
        }
        item.setAttribute('draggable', 'true'); 
    }
    botonGuardar.style.display = 'none'
    lamparaElement.classList.remove('lampara')
    textoEstado.innerHTML = ''
    resultado.innerHTML = '';
    rightBox.style.display = 'none';
    leftBox.style.display = 'none';
    contenedorImagenes.forEach((contenedor) => {
        contenedor.style.border = '2px solid black'
    });

    mostrarTiempo();
    audioApurate.pause()
    puntuacion.value = 0
    testado.value = ''
    tiempoAgotado = false
    botonIniciarPausar.style.display = 'block'
    botonIniciarPausar.textContent = "Iniciar Juego";
    return
}

botonInvisible.addEventListener('click', reiniciarJuego);

function actualizarCamposFormulario() {
    const estadoTexto = textoEstado.textContent.trim(); // Obtener el texto del estado
    puntuacion.value = puntaje;
    testado.value = estadoTexto;
}
