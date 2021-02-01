import { cards, groups, spreads } from "./sakura-cards-db.js";
import PantallaInicial from "../pantallaInicial/pantallaInicial.js";
import Carta from "../carta/carta.js";
import PantallaCartas from "../pantallaCartas/pantallaCartas.js";
import Procesando from "../pantallaProcesando/pantallaProcesando.js";

function timeOutPromise(tiempo) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("salimo bien");
    }, tiempo);
  });
}

function empezar() {
  let procesando = new Procesando();
  pantallaInicial.modelo.remove();
  container.appendChild(procesando.modelo);
  container.classList.add("color-change-2x");
  timeOutPromise(5000).then((response) => {
    container.classList.remove("color-change-2x");

    let cartas = [];
    while (cartas.length < 6) {
      let numeroAleatorio = Math.floor(Math.random() * 51);
      if (cartas.indexOf(numeroAleatorio) === -1) {
        cartas.push(numeroAleatorio);
      }
    }

    let cartasSeleccionadas = cartas.map((numeroCarta) => cards[numeroCarta]);

    let pantallaCartas = new PantallaCartas(cartasSeleccionadas);

    container.appendChild(pantallaCartas.modelo);

    let flkty = new Flickity(".carousel", {
      draggable: true,
      setGallerySize: false,
    });

    let img = document.querySelector(".carta__imagen");
    img.addEventListener("load", () => {
      procesando.modelo.remove();
      unaCarta.modelo.classList.remove("off");
    });
  });
}

const container = document.querySelector(".container");

let pantallaInicial = new PantallaInicial();

container.appendChild(pantallaInicial.modelo);

let btn_inicio__empezar = document.getElementById("inicio__empezar");
btn_inicio__empezar.addEventListener("click", empezar);
