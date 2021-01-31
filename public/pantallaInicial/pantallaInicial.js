export default class PantallaInicial {
  constructor() {
    this.modelo = this.modelo();
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
    unLabel.for = "jugador" + nroJugador;
    unLabel.textContent = "Como se llama?";
    divValid.classList.add("valid-tooltip");
    divValid.textContent = "Bien !!!";
    divInvalid.classList.add("invalid-tooltip");
    divInvalid.textContent = "Te falto este jugador...";

    unDiv.append(unInput, unLabel, divValid, divInvalid);
    return unDiv;
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
    unTitulo.textContent = "Sakura card Captors";
    unForm.classList.add("inicio__formulario");
    unBoton.classList.add("inicio__empezar");
    unBoton.textContent = "Voy a tener suerte";
    unBoton.type = "button";
    unBoton.id = "inicio__empezar";

    unForm.append(inputJugador1, inputJugador2, unBoton);
    divInicio.append(unTitulo, unForm);
    return divInicio;
  }
}
