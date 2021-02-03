import { cards } from "../js/sakura-cards-db.js";
export default class pantallaResultado {
  constructor(juego,acciones) {
    console.log(juego);
    this.matriz = this.definirMatriz();
    this.cartasSorteadas = juego.cartasSorteadas;
    this.nombreJugadores = juego.jugadores;
    this.ganador = this.resultado(juego.cartasSorteadas);
    this.acciones = acciones
    this.modelo = this.modelo(juego.cartasSorteadas,acciones);
  }
  definirMatriz() {
    /*red > green */
    /*green > purple */
    /*purple > blue */
    /*blue > red */
    let matriz = Array(4)
      .fill()
      .map(() => Array(4).fill());
    matriz[0][0] = 0;
    matriz[0][1] = 1;
    matriz[0][2] = 0;
    matriz[0][3] = -1;
    matriz[1][0] = -1;
    matriz[1][1] = 0;
    matriz[1][2] = 1;
    matriz[1][3] = 0;
    matriz[2][0] = 0;
    matriz[2][1] = -1;
    matriz[2][2] = 0;
    matriz[2][3] = 1;
    matriz[3][0] = 1;
    matriz[3][1] = 0;
    matriz[3][2] = -1;
    matriz[3][3] = 0;
    return matriz;
  }

  valorColor(color) {
    let salida;
    switch (color) {
      case "Red":
        salida = 0;
        break;
      case "Green":
        salida = 1;
        break;
      case "Purple":
        salida = 2;
        break;
      case "Blue":
        salida = 3;
        break;
      default:
        console.log("Imposibruuu !!!");
    }
    return salida;
  }

  matchColores(color1, color2) {
    let posColor1 = this.valorColor(color1);
    let posColor2 = this.valorColor(color2);
    let valor = this.matriz[posColor1][posColor2];
    return valor;
  }

  resultado(cartasSorteadas) {
    let resultado = 0;
    let ganador;
    cartasSorteadas[0].cartas.forEach((indiceCarta, nroCarta) => {
      let cartaJugador1 = cards[indiceCarta];
      let cartaJugador2 = cards[cartasSorteadas[1].cartas[nroCarta]];
      resultado += this.matchColores(cartaJugador1.group, cartaJugador2.group);
    });
    // if (resultado < 0) {
    //   ganador = "Ganó " + this.nombreJugadores[0];
    // } else if (resultado > 0) {
    //   ganador = "Ganó " + this.nombreJugadores[1];
    // } else {
    //   ganador = "Empate";
    // }
    if (resultado>0){
      ganador = 'MATCH'
    }else{
      ganador = 'NO MATCH'
    }
    return ganador;
  }

  cartasJugador(contenedor, jugador) {
    jugador.cartas.forEach((indiceCarta, nroCarta) => {
      let carta = cards[indiceCarta];
      let cartaContainer = document.createElement('div')
      let imagen = document.createElement("img");
      let hoverImagen = document.createElement('div')

      cartaContainer.classList.add('cartas__container')
      imagen.classList.add("cartas__carta");
      imagen.src = "clow_cards_min/Clow" + carta.name + "-min.jpg";
      imagen.alt = "imagen Clow" + carta.name;
      hoverImagen.classList.add('cartas__tipo','cartas__tipo--'+carta.group)

      cartaContainer.append(imagen,hoverImagen)
      contenedor.appendChild(cartaContainer);
    });
  }

  modelo(cartasSorteadas,acciones) {
    let resultado = document.createElement("div");
    let jugador1 = document.createElement("h3");
    let jugador2 = document.createElement("h3");
    let cartasJugador1 = document.createElement("div");
    let cartasJugador2 = document.createElement("div");
    let ganador = document.createElement("h2");
    let botonera = document.createElement("div");
    let botonGuardar = document.createElement("button");
    let botonSalir = document.createElement("button");

    resultado.classList.add("resultado");
    jugador1.classList.add("resultado__jugador");
    jugador1.textContent = this.nombreJugadores[0];
    jugador2.classList.add("resultado__jugador");
    jugador2.textContent = this.nombreJugadores[1];
    cartasJugador1.classList.add("resultado__cartas");
    cartasJugador2.classList.add("resultado__cartas");
    ganador.classList.add("resultado__jugador");
    ganador.classList.add("heartbeat");
    ganador.textContent = this.ganador;
    this.cartasJugador(cartasJugador1, cartasSorteadas[0]);
    this.cartasJugador(cartasJugador2, cartasSorteadas[1]);
    botonera.classList.add("resultado__botonera");
    botonGuardar.classList.add("botonera__boton");
    botonGuardar.id = 'boton_guardar'
    botonGuardar.textContent = "Guardar";
    botonSalir.classList.add("botonera__boton");
    botonSalir.textContent = "Salir";
    botonGuardar.addEventListener("click", () => acciones.guardar());
    botonSalir.addEventListener("click", () => acciones.salir());


    botonera.append(botonGuardar, botonSalir);

    resultado.append(
      jugador1,
      cartasJugador1,
      ganador,
      cartasJugador2,
      jugador2,
      botonera
    );

    return resultado;
  }
}
