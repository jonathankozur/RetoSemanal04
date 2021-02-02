import PantallaInicial from "../pantallaInicial/pantallaInicial.js";
import PantallaCartas from "../pantallaCartas/pantallaCartas.js";
import PantallaProcesando from "../pantallaProcesando/pantallaProcesando.js";

const tiempoPantallaCarga = 1000;
let cartasPorJugador = 3;
let jugadores = ["pepe", "sapo"];

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
    jugadores.push(elemento.value);
  }
  return valido;
}
function validar() {
  limpiarValidacion("is-valid");
  limpiarValidacion("is-invalid");

  let valido = true;
  jugadores = Array(0);
  valido =
    esNulo(document.getElementById("jugador1")) &
    esNulo(document.getElementById("jugador2"));

  if (valido) {
    limpiarValidacion("is-valid");
  }

  return valido;
}

function empezar() {
  return new Promise(function (resolve, reject) {
    if (!validar()) {
      return reject("Fallo la validación");
    }
    pantallaInicial.modelo.remove();
    return resolve("Resolvimos empezar");
  });
}

function procesando() {
  return new Promise(function (resolve, reject) {
    let pantallaProcesando = new PantallaProcesando();
    container.appendChild(pantallaProcesando.modelo);
    container.classList.add("color-change-2x");
    timeOutPromise(tiempoPantallaCarga).then((response) => {
      console.log(response);
      container.classList.remove("color-change-2x");
      pantallaProcesando.modelo.remove();
      return resolve("Resolvimos Procesando");
    });
  });
}

function cartas() {
  return new Promise(function (resolve, reject) {
    let pantallaCartas = new PantallaCartas(jugadores, cartasPorJugador);

    container.appendChild(pantallaCartas.modelo);

    let img = document.querySelector(".carta__imagen");
    img.addEventListener("load", () => {
      pantallaCartas.modelo.classList.remove("off");
      let flkty = new Flickity(".carousel", {
        draggable: true,
        setGallerySize: false,

        on: {
          change: function (index) {
            if (jugadores.length * cartasPorJugador == index + 1) {
              console.log("Llego al final del carrousel");
            }
          },
        },
      });
    });

    return resolve("Resolvimos Cartas");
  });
}

const container = document.querySelector(".container");

let pantallaInicial = new PantallaInicial();

container.appendChild(pantallaInicial.modelo);

let btn_inicio__empezar = document.getElementById("inicio__empezar");

btn_inicio__empezar.addEventListener("click", () => {
  empezar()
    .then((response) => {
      console.log(response);
      procesando().then((response) => {
        console.log(response);
        cartas().then((response) => {
          console.log(response);
        });
      });
    })
    .catch((response) => {
      console.log(response);
    });
});
