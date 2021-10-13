$(document).ready(() => {
    //BOTON PARA LIMPIAR PANTALLA
    $("#btnLimpiar").click(() => {
        //ELIMINA EL LISTADO DE CUOTAS
        $('.listas').slideUp('slow', function () {
            $('#cuota, #interes, #amortizacion, #saldo-deuda, #cuotaAleman, #interesAleman, #amortizacionAleman, #saldo-deudaAleman').empty();
        });

        //ELIMINA LAS LINEAS QUE MUESTRAN LOS DATOS GUARDADOS EN MEMORIA
        $('.valorEnMemoria').fadeOut('slow', function () {
            $('#tnaMemoria, #cantCuotasMemoria, #valorPrestamoMemoria').empty();
        });

        $('.titulo-valores').fadeOut('slow', function () {
            $('.titulo-seccion1, .titulo-seccion2').empty();
        });
    });
});