$(document).ready(() => {
    // CALCULADORA DE TASA DE INTERES SISTEMA FRANCES

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
        let caso1 = new BaseCalc(tasaNominalAnual, interes, cantidadDeCuotas, valorDelPrestamo);


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
});