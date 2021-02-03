export default class PantallaInicial {
  constructor() {
    this.modelo = this.modelo();
    this.partidasGuardadas = []
  }
  inputJugador(nroJugador) {
    let unDiv = document.createElement("div");
    let unInput = document.createElement("input");
    let unLabel = document.createElement("label");
    let divValid = document.createElement("div");
    let divInvalid = document.createElement("div");

    unDiv.classList.add("form-floating", "mb-3", "inicio__jugador");
    unInput.type = "text";
    unInput.classList.add("form-control", "inicio__input");
    unInput.id = "jugador" + nroJugador;
    unInput.placeholder = "jugador " + nroJugador;
    unInput.setAttribute("required", true);
    unInput.setAttribute("maxlength", 15);
    unLabel.for = "jugador" + nroJugador;
    unLabel.textContent = "Jugador "+nroJugador;
    divValid.classList.add("valid-tooltip");
    divValid.textContent = "Bien !!!";
    divInvalid.classList.add("invalid-tooltip");
    divInvalid.textContent = "Te falto este jugador...";

    unDiv.append(unInput, unLabel, divValid, divInvalid);
    return unDiv;
  }

  agregarPartida(juegoSorteado,verPartida){
    if (this.partidasGuardadas.length == 0){
      this.modelo.querySelector('.inicio__partidas--titulo').classList.remove('off')
      this.modelo.querySelector('.partidas').classList.remove('off')
    }
    if (this.partidasGuardadas.length >= 4){
      this.modelo.querySelector('.partidas__partida').remove()
      this.partidasGuardadas.shift()
    }
    this.partidasGuardadas.push(juegoSorteado)
    let partida = document.createElement('li')
    let partida_nombre = document.createElement('h4')

    partida.addEventListener('click',(e)=>{
      console.log(juegoSorteado)
      verPartida()
    })

    partida.classList.add('partidas__partida')
    partida_nombre.classList.add('partidas__partida--nombre')
    partida_nombre.textContent =  juegoSorteado.jugadores[0]+' vs '+juegoSorteado.jugadores[1]
    partida_nombre.setAttribute('partida',0)

    partida.appendChild(partida_nombre)

    this.modelo.querySelector('.partidas').appendChild(partida)
  }

  modelo() {
    let divInicio = document.createElement("div");
    let unTitulo = document.createElement("h1");
    let unForm = document.createElement("form");
    let inputJugador1 = this.inputJugador(1);
    let inputJugador2 = this.inputJugador(2);
    let unBoton = document.createElement("button");

    divInicio.classList.add("inicio");
    unTitulo.classList.add("inicio__titulo");
    unTitulo.textContent = "Cartas Clow";
    unForm.classList.add("inicio__formulario");
    unBoton.classList.add("inicio__empezar");
    unBoton.textContent = "Voy a tener suerte";
    unBoton.type = "button";
    unBoton.id = "inicio__empezar";

    /*Partidas Guardadas*/
    let partidas_titulo = document.createElement('h3')
    let partidas = document.createElement('ul')

    partidas_titulo.classList.add('inicio__partidas--titulo')
    partidas_titulo.classList.add('off')
    partidas_titulo.textContent = 'Partidas Guardadas'
    partidas.classList.add('partidas')
    partidas.classList.add('off')

    unForm.append(inputJugador1, inputJugador2, unBoton);
    divInicio.append(unTitulo, unForm, partidas_titulo, partidas);

    return divInicio;
  }

  inicializar() {
    this.modelo.querySelector("#jugador1").value = "";
    this.modelo.querySelector("#jugador2").value = "";
  }
}
