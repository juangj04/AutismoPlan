const musica = new Audio("/static/core/sounds/luna-rise-part-one.mp3");
musica.loop = true;
musica.play()
const botonMusica = document.getElementById('alternar-musica');
botonMusica.addEventListener('click', () => {
    if (musica.paused) {
        musica.play();
        botonMusica.classList.add('musica-encendida');
    } else {
        musica.pause();
        botonMusica.classList.remove('musica-encendida');
    }
});




