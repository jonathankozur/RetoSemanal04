export default class Procesando {
  constructor() {
    this.modelo = this.modelo();
  }

  modelo() {
    let unTitulo = document.createElement("h1");

    unTitulo.classList.add("tracking-in-expand");
    unTitulo.textContent = "Procesando";

    setTimeout(() => {
      unTitulo.classList.remove("tracking-in-expand");
      unTitulo.classList.add("tracking-out-contract");
    }, 3000);

    return unTitulo;
  }
}
