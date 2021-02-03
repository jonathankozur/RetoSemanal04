export default class ModalPopup {
  constructor(acciones) {
    this.modelo = this.modelo(acciones);
    this.accionBotones = acciones;
  }
  crearBoton(accion, idBoton) {
    let boton = document.createElement("button");
    boton.classList.add("modalPopup__boton");
    boton.id = "modalPopup__boton" + idBoton;
    boton.textContent = accion.label;
    boton.addEventListener("click", () => accion.accion());
    return boton;
  }
  cerrarModal(fondo) {
    fondo.classList.remove("scale-in-tr");
    fondo.classList.add("scale-out-tr");
    setTimeout(() => {
      fondo.remove();
    }, 400);
  }

  modelo(acciones) {
    let fondo = document.createElement("div");
    let cuadro = document.createElement("div");

    fondo.classList.add("modalPopup__fondo", "scale-in-tr");
    cuadro.classList.add("modalPopup__cuadro");
    acciones.forEach((accion, indice) => {
      cuadro.appendChild(this.crearBoton(accion, indice));
    });
    fondo.appendChild(cuadro);
    fondo.addEventListener("click", (e) => {
      if (e.target.classList.contains("modalPopup__fondo")) {
        this.cerrarModal(fondo);
      }
    });

    return fondo;
  }
}
