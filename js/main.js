$(document).ready(() => {


    // CALCULADORA DE TASA DE INTERES SISTEMA FRANCES

    //Hice de la base de mi codigo una clase.

    class SistemaFrances {
        constructor(TNA, int, cantCuotas, valorPrestamo) {
            this.TNA = TNA;
            this.int = int;
            this.cantCuotas = cantCuotas;
            this.valorPrestamo = valorPrestamo;
        }

        //FUNCIÓN PARA DETERMINAR EL VALOR DE LA CUOTA
        cuotaDelPrestamo() {
            return parseInt(this.valorPrestamo) * (this.int / 100) / (1 - (1 + (this.int / 100)) ** -parseInt(this.cantCuotas));
        }

        //FUNCIÓN PARA DETERMINAR LA AMORTIZACIÓN DE LA CUOTA
        amortizacion() {
            return parseFloat(this.cuotaDelPrestamo()) - parseFloat(this.interes());
        }

        //FUNCIÓN PARA DETERMINRAR EL VALOR DEL INTERES QUE AFECTA LA CUOTA
        interes() {
            return parseFloat(this.valorPrestamo) * (this.int / 100);
        }

    };

    //VARIABLES
    let tasaNominalAnual
    let cantidadDeCuotas
    let valorDelPrestamo

    //BOTON CON FUNCIONALIDAD PARA HACER LOS CALCULOS
    $("#btnCalcular").click(() => {

        tasaNominalAnual = $("#tna").val();
        cantidadDeCuotas = $("#cantCuotas").val();
        valorDelPrestamo = $("#valorPrestamo").val();

        localStorage.setItem('tasaNominalAnual', JSON.stringify(tasaNominalAnual));
        localStorage.setItem('cantidadDeCuotas', JSON.stringify(cantidadDeCuotas));
        localStorage.setItem('valorDelPrestamo', JSON.stringify(valorDelPrestamo));



        let interes = parseFloat(tasaNominalAnual) / 12;
        let caso1 = new SistemaFrances(tasaNominalAnual, interes, cantidadDeCuotas, valorDelPrestamo);


        //BUCLE PARA DEVOLVER LAS CUOTAS
        const arrayCuotas = [];
        for (let i = 0; i < parseInt(cantidadDeCuotas); i++) {
            if (i <= parseInt(cantidadDeCuotas)) {
                arrayCuotas.push(`\nCuota nro. ${i + 1} = ${caso1.cuotaDelPrestamo().toFixed(2)}`);
            } else {
                console.log('ERROR')
            };
        };

        //BUCLE PARA CALCULAR LA AMORTIZACIÓN
        let amortizacionAuxiliar = caso1.amortizacion();
        const arrayAmortizacionTexto = [];
        const arrayAmortizacionValores = [];

        for (let i = 0; i < parseInt(cantidadDeCuotas); i++) {
            if (i == 0) {
                arrayAmortizacionTexto.push(`\nAmortizacion cuota nro. ${i + 1} = ${amortizacionAuxiliar.toFixed(2)}`);
                arrayAmortizacionValores.push(amortizacionAuxiliar.toFixed(2));
            } else {
                amortizacionAuxiliar = amortizacionAuxiliar * (1 + (interes / 100));
                arrayAmortizacionTexto.push(`\nAmortizacion cuota nro. ${i + 1} = ${amortizacionAuxiliar.toFixed(2)}`);
                arrayAmortizacionValores.push(amortizacionAuxiliar.toFixed(2));
            };
        };

        //FIN BUCLE AMORTIZACION

        //MAP PARA CALCULAR EL INTERES RESPECTIVO A CADA CUOTA - 
        const arrayIneteres = arrayAmortizacionValores.map((amortizacion, index) => `\nInteres cuota ${index + 1} = ${(caso1.cuotaDelPrestamo() - amortizacion).toFixed(2)}`);
        //FIN MAP PARA CALCULAR INTERES

        //PARA CALCULAR EL SALDO DE DEUDA
        let saldoAuxiliar = parseInt(valorDelPrestamo);

        const arraySaldoDeuda = arrayAmortizacionValores.map((amortizacion) => {
            const saldoActual = (saldoAuxiliar - amortizacion).toFixed(2);
            saldoAuxiliar = saldoActual;
            return saldoActual;
        });

        const arraySaldoDeudaText = arraySaldoDeuda.map((saldo, index) => `Saldo cuota ${index + 1} = ${saldo} `)
        //FIN CALCULAR SALDO DE DEUDA



        //INCORPORA EN EL DOM UN LISTADO CON EL CONTENIDO DEL ARRAY DE CUOTAS 
        for (const cuotas of arrayCuotas) {
            $('#cuota').append(`<li class="listas" style="display: none">${cuotas}</li>`);
        }
        //FIN LISTADO CUOTAS

        //INCORPORA EN EL DOM UN LISTADO CON EL CONTENIDO DEL ARRAY DE INTERES X CADA CUOTA
        for (const interes of arrayIneteres) {
            $('#interes').append(`<li class="listas" style="display: none">${interes}</li>`);
        }
        //FIN LISTADO DE INTERESES

        //INCORPORA EN EL DOM UN LISTADO CON EL CONTENIDO DEL ARRAY DE AMORTIZACIÓN X CADA CUOTA
        for (const amortizacion of arrayAmortizacionTexto) {
            $('#amortizacion').append(`<li class="listas" style="display: none">${amortizacion}</li>`);
        }
        //FIN DE LISTADO AMORTIZACION

        //INCORPORA EN EL DOM UN LISTADO CON EL CONTENIDO DEL ARRAY DE SALDO DE DEUDA X CADA CUOTA
        for (const saldo of arraySaldoDeudaText) {
            $('#saldo-deuda').append(`<li class="listas" style="display: none">${saldo}</li>`)

        }
        //FIN LISTADO SALDO DE DEUDA
        $('.listas').slideDown('slow');
    });
    //FIN BOTON CON FUNCIONALIDAD PARA HACER LOS CÁLCULOS

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
    //FIN BOTON PARA LIMIPIAR PANTALLA

    //BOTON PARA REPETIR ÚLTIMA OPERACIÓN

    $("#btnUltimosValores").click(() => {
        tasaNominalAnual = JSON.parse(localStorage.getItem('tasaNominalAnual'));
        cantidadDeCuotas = JSON.parse(localStorage.getItem('cantidadDeCuotas'));
        valorDelPrestamo = JSON.parse(localStorage.getItem('valorDelPrestamo'));

        $('#tnaMemoria').append(`<p class="valorEnMemoria" style="display: none">El valor de TNA en memoria es:<br>${JSON.parse(localStorage.getItem('tasaNominalAnual'))}</p>`);

        $('#cantCuotasMemoria').append(`<p class="valorEnMemoria" style="display: none">La cant. de cuotas en memoria es:<br>${JSON.parse(localStorage.getItem('cantidadDeCuotas'))}</p>`);

        $('#valorPrestamoMemoria').append(`<p class="valorEnMemoria" style="display: none">El valor del prestamo en memoria es:<br>${JSON.parse(localStorage.getItem('valorDelPrestamo'))}</p>`);

        let interes = parseFloat(tasaNominalAnual) / 12;
        let caso1 = new SistemaFrances(tasaNominalAnual, interes, cantidadDeCuotas, valorDelPrestamo);


        //BUCLE PARA DEVOLVER LAS CUOTAS
        const arrayCuotas = [];
        for (let i = 0; i < parseInt(cantidadDeCuotas); i++) {
            if (i <= parseInt(cantidadDeCuotas)) {
                arrayCuotas.push(`\nCuota nro. ${i + 1} = ${caso1.cuotaDelPrestamo().toFixed(2)}`);
            } else {
                console.log('ERROR')
            };
        };

        //BUCLE PARA CALCULAR LA AMORTIZACIÓN
        let amortizacionAuxiliar = caso1.amortizacion();
        const arrayAmortizacionTexto = [];
        const arrayAmortizacionValores = [];

        for (let i = 0; i < parseInt(cantidadDeCuotas); i++) {
            if (i == 0) {
                arrayAmortizacionTexto.push(`\nAmortizacion cuota nro. ${i + 1} = ${amortizacionAuxiliar.toFixed(2)}`);
                arrayAmortizacionValores.push(amortizacionAuxiliar.toFixed(2));
            } else {
                amortizacionAuxiliar = amortizacionAuxiliar * (1 + (interes / 100));
                arrayAmortizacionTexto.push(`\nAmortizacion cuota nro. ${i + 1} = ${amortizacionAuxiliar.toFixed(2)}`);
                arrayAmortizacionValores.push(amortizacionAuxiliar.toFixed(2));
            };
        };

        //FIN BUCLE AMORTIZACION

        //MAP PARA CALCULAR EL INTERES RESPECTIVO A CADA CUOTA - 
        const arrayIneteres = arrayAmortizacionValores.map((amortizacion, index) => `\nInteres cuota ${index + 1} = ${(caso1.cuotaDelPrestamo() - amortizacion).toFixed(2)}`);
        //FIN MAP PARA CALCULAR INTERES

        //PARA CALCULAR EL SALDO DE DEUDA
        let saldoAuxiliar = parseInt(valorDelPrestamo);

        const arraySaldoDeuda = arrayAmortizacionValores.map((amortizacion) => {
            const saldoActual = (saldoAuxiliar - amortizacion).toFixed(2);
            saldoAuxiliar = saldoActual;
            return saldoActual;
        });

        const arraySaldoDeudaText = arraySaldoDeuda.map((saldo, index) => `Saldo cuota ${index + 1} = ${saldo} `)
        //FIN CALCULAR SALDO DE DEUDA



        //INCORPORA EN EL DOM UN LISTADO CON EL CONTENIDO DEL ARRAY DE CUOTAS 
        for (const cuotas of arrayCuotas) {
            $('#cuota').append(`<li class="listas" style="display: none">${cuotas}</li>`);
        }
        //FIN LISTADO CUOTAS

        //INCORPORA EN EL DOM UN LISTADO CON EL CONTENIDO DEL ARRAY DE INTERES X CADA CUOTA
        for (const interes of arrayIneteres) {
            $('#interes').append(`<li class="listas" style="display: none">${interes}</li>`);
        }
        //FIN LISTADO DE INTERESES

        //INCORPORA EN EL DOM UN LISTADO CON EL CONTENIDO DEL ARRAY DE AMORTIZACIÓN X CADA CUOTA
        for (const amortizacion of arrayAmortizacionTexto) {
            $('#amortizacion').append(`<li class="listas" style="display: none">${amortizacion}</li>`);
        }
        //FIN DE LISTADO AMORTIZACION

        //INCORPORA EN EL DOM UN LISTADO CON EL CONTENIDO DEL ARRAY DE SALDO DE DEUDA X CADA CUOTA
        for (const saldo of arraySaldoDeudaText) {
            $('#saldo-deuda').append(`<li class="listas" style="display: none">${saldo}</li>`)
        }
        //FIN LISTADO SALDO DE DEUDA
        $('.valorEnMemoria').fadeIn('slow');
        $('.listas').slideDown('slow');
    });
    //FIN BONTON PARA REPETIR ÚLTIMA OPERACIÓN
});