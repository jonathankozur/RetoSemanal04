import PantallaInicial from "../pantallaInicial/pantallaInicial.js";
import PantallaCartas from "../pantallaCartas/pantallaCartas.js";
import PantallaProcesando from "../pantallaProcesando/pantallaProcesando.js";
import ModalPopup from "../modalPopup/modalPopup.js";
import PantallaResultado from "../pantallaResultado/pantallaResultado.js";

/*****************************************/
/***********algunas variables*************/
/*****************************************/
let tiempoPantallaCarga = 3000;
let tiempoAparicionModal = 3000;
let cartasPorJugador = 3;
/*****************************************/
/***************Functions*****************/
/*****************************************/
function timeOutPromise(tiempo) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("Resolvimos Timer");
    }, tiempo);
  });
}

function limpiarValidacion(clase) {
  let elements = document.getElementsByClassName(clase);

  while (elements.length > 0) {
    elements[0].classList.remove(clase);
  }
}
function esNulo(elemento) {
  let valido = true;

  if (!elemento.value) {
    elemento.classList.add("is-invalid");
    valido = false;
  } else {
    elemento.classList.add("is-valid");
  }
  return valido;
}
function validar(inputs) {
  limpiarValidacion("is-valid");
  limpiarValidacion("is-invalid");

  let valido = true;

  inputs.forEach((input) => {
    valido = valido & esNulo(input);
  });

  if (valido) {
    limpiarValidacion("is-valid");
  }

  return valido;
}

function empezar() {
  return new Promise(function (resolve, reject) {
    let jugador1 = document.getElementById("jugador1");
    let jugador2 = document.getElementById("jugador2");
    let inputs = [jugador1, jugador2];
    let jugadores = Array(0);
    if (!validar(inputs)) {
      return reject("Fallo la validación");
    }
    inputs.forEach((input) => {
      jugadores.push(input.value);
    });

    pantallaInicial.modelo.remove();
    return resolve({ jugadores, cartasPorJugador });
  });
}

function procesando(juego) {
  return new Promise(function (resolve, reject) {
    let pantallaProcesando = new PantallaProcesando(
      juego.jugadores,
      juego.cartasPorJugador
    );
    container.appendChild(pantallaProcesando.modelo);
    container.classList.add("color-change-2x");
    timeOutPromise(tiempoPantallaCarga).then((response) => {
      console.log(response);
      container.classList.remove("color-change-2x");
      pantallaProcesando.modelo.remove();

      return resolve({
        jugadores: juego.jugadores,
        cartasSorteadas: pantallaProcesando.cartasSorteadas,
      });
    });
  });
}

function cartas(juegoSorteado, accionesModal) {
  return new Promise(function (resolve, reject) {
    let pantallaCartas = new PantallaCartas(
      juegoSorteado.jugadores,
      juegoSorteado.cartasSorteadas
    );

    let largoMatriz = (acum, valorActual) => acum + valorActual.cartas.length;
    let cantidadCartasTotal = juegoSorteado.cartasSorteadas.reduce(
      largoMatriz,
      0
    );

    container.appendChild(pantallaCartas.modelo);

    let img = document.querySelector(".carta__imagen");
    img.addEventListener("load", () => {
      pantallaCartas.modelo.classList.remove("off");
      let flkty = new Flickity(".carousel", {
        draggable: true,
        setGallerySize: false,
        on: {
          change: function (index) {
            if (cantidadCartasTotal == index + 1) {
              console.log("Llego al final del carrousel");
              timeOutPromise(tiempoAparicionModal).then((response) =>
                accionesModal(juegoSorteado)
              );
            }
          },
        },
      });

      let botonSalir = document.createElement("button");
      let icono = document.createElement("i");

      botonSalir.classList.add("carta__botonSalir");
      icono.classList.add("fas", "fa-angle-down");
      botonSalir.appendChild(icono);
      document.querySelector(".carousel").appendChild(botonSalir);
      botonSalir.addEventListener("click", () => accionesModal(juegoSorteado));
    });

    return resolve("Terminamos Cartas");
  });
}

function ModalAccionesJuegoGuardado(juegoSorteado) {
  let acciones = [];
  acciones[0] = {
    label: "Ver resultado",
    accion: () => {
      resultado(juegoSorteado);
      document.querySelector("#boton_guardar").classList.add("off");
    },
  };
  acciones[1] = {
    label: "Volver",
    accion: () => {
      console.log("Volver a jugar");
      document.querySelector(".modalPopup__fondo").remove();
      document.querySelector(".carousel").remove();
      volverJugar();
    },
  };
  modalAcciones(acciones);
}

function ModalAccionesJuegoNuevo(juegoSorteado) {
  let acciones = [];
  acciones[0] = {
    label: "Ver resultado",
    accion: () => resultado(juegoSorteado),
  };
  acciones[1] = {
    label: "Volver a jugar",
    accion: () => {
      console.log("Volver a jugar");
      document.querySelector(".modalPopup__fondo").remove();
      document.querySelector(".carousel").remove();
      volverJugar();
    },
  };
  modalAcciones(acciones);
}

function modalAcciones(acciones) {
  let modalPopup = new ModalPopup(acciones);
  container.appendChild(modalPopup.modelo);
}

function resultado(juegoSorteado) {
  console.log("Resultado");
  document.querySelector(".modalPopup__fondo").remove();
  document.querySelector(".carousel").remove();

  let accionesPantallaResultado = {
    salir: () => {
      console.log("Salir");
      document.querySelector(".resultado").remove();
      volverJugar();
    },
    guardar: () => {
      console.log("Guardar");
      let verPartida = () => {
        console.log("Ver partida");
        pantallaInicial.modelo.remove();
        let accion = (juegoSorteado) =>
          ModalAccionesJuegoGuardado(juegoSorteado);
        cartas(juegoSorteado, accion);
      };
      pantallaInicial.agregarPartida(juegoSorteado, verPartida);
      document.querySelector(".resultado").remove();
      volverJugar();
    },
  };
  let pantallaResultado = new PantallaResultado(
    juegoSorteado,
    accionesPantallaResultado
  );
  container.appendChild(pantallaResultado.modelo);
}

function volverJugar() {
  pantallaInicial.inicializar();
  container.appendChild(pantallaInicial.modelo);
}

/*****************************************/
/***********Aca empezamos todo************/
/*****************************************/
const container = document.querySelector(".container");
let pantallaInicial = new PantallaInicial();
container.appendChild(pantallaInicial.modelo);
let btn_inicio__empezar = document.getElementById("inicio__empezar");

btn_inicio__empezar.addEventListener("click", () => {
  empezar()
    .then((response) => {
      console.log("Resolvimos empezar()", response);
      procesando(response).then((response) => {
        console.log("Resolvimos procesando()", response);
        let accion = (juegoSorteado) => ModalAccionesJuegoNuevo(juegoSorteado);
        cartas(response, accion).then((response) => {
          console.log("Resolvimos cartas()", response);
        });
      });
    })
    .catch((response) => {
      console.log(response);
    });
});
