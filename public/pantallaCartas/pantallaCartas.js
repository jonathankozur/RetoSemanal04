export default class PantallaCartas {
  constructor(cartasSeleccionadas) {
    this.cartasSeleccionadas = cartasSeleccionadas;
    this.modelo = this.modelo(cartasSeleccionadas);
  }

  modelo(cartasSeleccionadas) {
    let unCarousel = document.createElement("div");
    unCarousel.classList.add("carousel");

    cartasSeleccionadas.forEach((carta) => {
      let unCell = document.createElement("div");
      let unaImagen = document.createElement("img");
      let unTitulo = document.createElement("h3");
      let unMensaje = document.createElement("p");

      unCell.classList.add("carousel-cell");
      unCell.setAttribute("data-id", carta.id);
      unCell.setAttribute("data-group", carta.group);
      unaImagen.classList.add("carta__imagen");
      unaImagen.src = "clow_cards_min/Clow" + carta.name + "-min.jpg";
      unaImagen.alt = "imagen ClowThunder";
      unTitulo.classList.add("carta__titulo");
      unTitulo.textContent = carta.name;
      unMensaje.classList.add("carta__mensaje");
      unMensaje.textContent = carta.message;

      unCell.append(unaImagen, unTitulo, unMensaje);
      unCarousel.append(unCell);
    });

    return unCarousel;
  }
}
