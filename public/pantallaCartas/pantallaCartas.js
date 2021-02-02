import { cards } from "../js/sakura-cards-db.js";
export default class PantallaCartas {
  constructor(nombreJugadores, cantidadCartas) {
    let cantidadJugadores = nombreJugadores.length;
    let jugadores = Array(cantidadJugadores);
    for (let i = 0; i < cantidadJugadores; i++) {
      jugadores[i] = new Object();
      jugadores[i].cartas = Array();
      while (jugadores[i].cartas.length < cantidadCartas) {
        let numeroAleatorio = Math.floor(Math.random() * 51);
        if (jugadores[i].cartas.indexOf(numeroAleatorio) === -1) {
          jugadores[i].cartas.push(numeroAleatorio);
        }
      }
    }
    this.nombreJugadores = nombreJugadores;
    this.cantidadJugadores = cantidadJugadores;
    this.cantidadCartas = cantidadCartas;
    this.jugadores = jugadores;

    this.modelo = this.modelo(jugadores);
  }

  crearCell(indiceCarta, nombreJugador, numeroCarta) {
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
      nombreJugador + " " + numeroCarta + "/" + this.cantidadCartas;
    unaImagen.classList.add("carta__imagen");
    unaImagen.src = "clow_cards_min/Clow" + carta.name + "-min.jpg";
    unaImagen.alt = "imagen ClowThunder";
    unTitulo.classList.add("carta__titulo");
    unTitulo.textContent = carta.name;
    unMensaje.classList.add("carta__mensaje");
    unMensaje.textContent = carta.message;

    unCell.append(unJugador, unaImagen, unTitulo, unMensaje);

    return unCell;
  }

  modelo(jugadores) {
    let unCarousel = document.createElement("div");
    unCarousel.classList.add("carousel");
    unCarousel.classList.add("off");

    jugadores.forEach((jugador, nroJugador) => {
      jugador.cartas.forEach((indiceCarta, nroCarta) => {
        let unCell = this.crearCell(
          indiceCarta,
          this.nombreJugadores[nroJugador],
          nroCarta + 1
        );
        unCarousel.append(unCell);
      });
    });

    return unCarousel;
  }
}
