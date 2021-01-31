import { cards, groups, spreads } from "./sakura-cards-db.js";
import PantallaInicial from "../pantallaInicial/pantallaInicial.js";
import Carta from "../carta/carta.js";
import Procesando from "../procesando/procesando.js";

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
    let random = Math.round(Math.random() * 51);
    let unaCarta = new Carta(
      random,
      cards[random].name,
      cards[random].group,
      cards[random].message
    );

    container.appendChild(unaCarta.modelo);
    let img = document.querySelector(".carta__imagen");
    img.addEventListener("load", () => {
      procesando.modelo.remove();
      unaCarta.modelo.classList.remove("off");
    });
  });
}

const container = document.getElementById("container");
let pantallaInicial = new PantallaInicial();

container.appendChild(pantallaInicial.modelo);

let btn_inicio__empezar = document.getElementById("inicio__empezar");
btn_inicio__empezar.addEventListener("click", () => {
  empezar();
});
