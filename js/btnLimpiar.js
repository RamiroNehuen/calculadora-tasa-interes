$(document).ready(() => {
    //BOTON PARA LIMPIAR PANTALLA
    $("#btnLimpiar").click(() => {
        //ELIMINA EL LISTADO DE CUOTAS
        $('.listas').slideUp('slow', function () {
            $('#cuota, #interes, #amortizacion, #saldo-deuda').empty();
        });

        //ELIMINA LAS LINEAS QUE MUESTRAN LOS DATOS GUARDADOS EN MEMORIA
        $('.valorEnMemoria').fadeOut('slow', function () {
            $('#tnaMemoria, #cantCuotasMemoria, #valorPrestamoMemoria').empty();
        });
    });
});