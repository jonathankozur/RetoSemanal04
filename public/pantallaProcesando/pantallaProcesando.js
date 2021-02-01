export default class Procesando {
  constructor() {
    this.modelo = this.modelo();
  }

  modelo() {
    let unCorazon = document.createElement("div");
    let interiorCorazon = document.createElement("div");

    unCorazon.classList.add("lds-heart");
    unCorazon.appendChild(interiorCorazon);

    return unCorazon;
  }
}
