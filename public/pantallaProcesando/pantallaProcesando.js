export default class pantallaProcesando {
  constructor(jugadores,cantidadCartas) {
    this.cartasSorteadas = this.sortearCartas(jugadores.length,cantidadCartas)
    this.modelo = this.modelo();
  }

  sortearCartas(cantidadJugadores, cantidadCartas){
    let cartas =Array()
    while (cartas.length < cantidadJugadores*cantidadCartas) {
      let numeroAleatorio = Math.floor(Math.random() * 51);
      if (cartas.indexOf(numeroAleatorio) === -1) {
        cartas.push(numeroAleatorio);
      }
    }

    let jugadores = Array(cantidadJugadores);

    for (let i = 0; i < cantidadJugadores; i++) {
      jugadores[i] = new Object();
      jugadores[i].cartas = Array(cantidadCartas);
      for (let j = 0; j < cantidadCartas; j++) {
        jugadores[i].cartas[j] = cartas[(i*3)+j]
      }
    }

    return jugadores
  }
  modelo() {
    let unCorazon = document.createElement("div");
    let interiorCorazon = document.createElement("div");

    unCorazon.classList.add("lds-heart");
    unCorazon.appendChild(interiorCorazon);

    return unCorazon;
  }
}
