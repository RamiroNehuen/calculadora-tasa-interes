//Declaramos la url que vamos a usar para el GET
const URLGET = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
//Agregamos un botón con jQuery


$(document).ready(() => {
  //Escuchamos el evento click del botón agregado
  $.get(URLGET, function (respuesta, estado) {
    if (estado === "success") {
      let valores = respuesta;
      for (const valor of valores) {
        if (valor.casa.nombre === "Argentina") {
          break;
        };
        $(".dolar-hoy").append(`<div class="caja-dolar">
                                   <h3 class="efecto-dolar" style="display:none">${valor.casa.nombre}</h3>
                                   <p class="efecto-dolar" style="display:none">Compra:${valor.casa.compra} // Venta: ${valor.casa.venta}</p>
                                  </div>`);

      }
    }
    $(".efecto-dolar").slideDown("slow");
  });

})