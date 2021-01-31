export default class Carta {
  constructor(id, nombre, grupo, mensaje) {
    this.id = id;
    this.nombre = nombre;
    this.grupo = grupo;
    this.mensaje = mensaje;
    this.modelo = this.modelo();
  }

  modelo() {
    let unaCarta = document.createElement("div");
    let unaImagen = document.createElement("img");
    let unTitulo = document.createElement("h3");
    let unMensaje = document.createElement("p");

    unaCarta.classList.add("carta");
    unaCarta.classList.add("off");
    unaImagen.classList.add("carta__imagen");
    unaImagen.src = "clow_cards_min/Clow" + this.nombre + "-min.jpg";
    unaImagen.alt = "imagen Clow" + this.nombre;
    unTitulo.classList.add("carta__titulo");
    unTitulo.textContent = this.nombre;
    unMensaje.classList.add("carta__mensaje");
    unMensaje.textContent = this.mensaje;

    unaCarta.append(unaImagen, unTitulo, unMensaje);

    return unaCarta;
  }
}
