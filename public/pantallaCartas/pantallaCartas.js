import { cards } from "../js/sakura-cards-db.js";
export default class PantallaCartas {
  constructor(nombreJugadores, cartasSorteadas) {
    this.nombreJugadores = nombreJugadores;
    this.cartasSorteadas = cartasSorteadas;
    this.modelo = this.modelo(cartasSorteadas);
  }

  crearCell(indiceCarta, nombreJugador, numeroCarta, totalCartas) {
    let carta = cards[indiceCarta];

    let unCell = document.createElement("div");
    let unJugador = document.createElement("h3");
    let unaImagen = document.createElement("img");
    let unTitulo = document.createElement("h4");
    let unMensaje = document.createElement("p");

    unCell.classList.add("carousel-cell");
    unCell.setAttribute("data-id", carta.id);
    unCell.setAttribute("data-group", carta.group);
    unJugador.classList.add("carta__jugador");
    unJugador.textContent =
      nombreJugador + " " + numeroCarta + "/" + totalCartas;
    unaImagen.classList.add("carta__imagen");
    unaImagen.src = "clow_cards_min/Clow" + carta.name + "-min.jpg";
    unaImagen.alt = "imagen Clow" + carta.name;
    unTitulo.classList.add("carta__titulo");
    unTitulo.textContent = carta.name;
    unMensaje.classList.add("carta__mensaje");
    unMensaje.textContent = carta.message;

    unCell.append(unJugador, unaImagen, unTitulo, unMensaje);

    return unCell;
  }

  modelo(cartasSorteadas) {
    let unCarousel = document.createElement("div");

    unCarousel.classList.add("carousel");
    unCarousel.classList.add("off");

    cartasSorteadas.forEach((jugador, nroJugador) => {
      jugador.cartas.forEach((indiceCarta, nroCarta) => {
        let unCell = this.crearCell(
          indiceCarta,
          this.nombreJugadores[nroJugador],
          nroCarta + 1,
          jugador.cartas.length
        );
        unCarousel.append(unCell);
      });
    });

    return unCarousel;
  }
}
