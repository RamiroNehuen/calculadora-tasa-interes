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

        // INICIO SISTEMA FRANCES

        //BUCLE PARA DEVOLVER LAS CUOTAS
        const arrayCuotas = [];
        for (let i = 0; i < parseInt(cantidadDeCuotas); i++) {
            if (i <= parseInt(cantidadDeCuotas)) {
                arrayCuotas.push({
                    texto: `\nCuota nro. ${i + 1} =`,
                    valor: caso1.cuotaDelPrestamo().toFixed(2)
                });
            } else {
                console.log('ERROR')
            };
        };

        //BUCLE PARA CALCULAR LA AMORTIZACIÓN
        let amortizacionAuxiliar = caso1.amortizacion();
        const arrayAmortizacionFrances = [];

        for (let i = 0; i < parseInt(cantidadDeCuotas); i++) {
            if (i == 0) {
                arrayAmortizacionFrances.push({
                    texto: `\nAmortizacion cuota nro. ${i + 1} =`,
                    valor: amortizacionAuxiliar.toFixed(2)
                });
            } else {
                amortizacionAuxiliar = amortizacionAuxiliar * (1 + (interes / 100));
                arrayAmortizacionFrances.push({
                    texto: `\nAmortizacion cuota nro. ${i + 1} =`,
                    valor: amortizacionAuxiliar.toFixed(2)
                });
            };
        };

        //FIN BUCLE AMORTIZACION

        //MAP PARA CALCULAR EL INTERES RESPECTIVO A CADA CUOTA - 
        const arrayIneteres = arrayAmortizacionFrances.map((amortizacion, index) => `\nInteres cuota ${index + 1} = ${(caso1.cuotaDelPrestamo() - amortizacion.valor).toFixed(2)}`);
        //FIN MAP PARA CALCULAR INTERES

        //PARA CALCULAR EL SALDO DE DEUDA
        let saldoAuxiliar = parseInt(valorDelPrestamo);

        const arraySaldoDeuda = arrayAmortizacionFrances.map((amortizacion, index) => {
            const saldoActual = (saldoAuxiliar - amortizacion.valor).toFixed(2);
            saldoAuxiliar = saldoActual;
            return `Saldo cuota ${index + 1} = ${saldoActual}`;
        });
        //FIN CALCULAR SALDO DE DEUDA

        // FIN SISTEMA FRANCES

        // INICIO SISTEMA ALEMAN

        // LISTADO VALORES AMORTIZACIÓN SISTEMA ALEMAN
        const arrayAmortizacionAleman = [];
        for (let i = 0; i < parseInt(cantidadDeCuotas); i++) {
            if (i <= parseInt(cantidadDeCuotas)) {
                arrayAmortizacionAleman.push({
                    texto: `\nAmortizacion cuota nro. ${i + 1} =`,
                    valor: caso1.amortizacionAleman()
                });
            } else {
                console.log('ERROR')
            };
        };

        //CALCULAR VALORES PARA LISTADO DE SALDO DE DEUDA SISTEMA ALEMAN
        let saldoDeudaAlemanAux = valorDelPrestamo - caso1.amortizacionAleman();
        const arraySaldoDeudaAleman = [];

        for (let i = 0; i < parseInt(cantidadDeCuotas); i++) {
            if (i == 0) {
                arraySaldoDeudaAleman.push({
                    texto: `\nSaldo cuota nro. ${i + 1} = `,
                    valor: saldoDeudaAlemanAux.toFixed(2)
                });
            } else {
                saldoDeudaAlemanAux = saldoDeudaAlemanAux - caso1.amortizacionAleman();
                arraySaldoDeudaAleman.push({
                    texto: `\nSaldo cuota nro. ${i + 1} = `,
                    valor: saldoDeudaAlemanAux.toFixed(2)
                });
            };
        };

        // CALCULAR VALROES PARA LISTADO DE INTERES SISTEMA ALEMAN
        const arrayInteresAleman = [];
        for (let [index] of arraySaldoDeudaAleman.entries()) {
            if (index == 0) {
                arrayInteresAleman.push({
                    texto: `\nInteres cuota nro. ${index + 1} = `,
                    valor: (valorDelPrestamo * (interes / 100)).toFixed(2)
                })
            } else {
                arrayInteresAleman.push({
                    texto: `\nInteres cuota nro. ${index + 1} = `,
                    valor: (arraySaldoDeudaAleman[index - 1].valor * (interes / 100)).toFixed(2)
                })
            }
        }

        //CALCULAR VALORES PARA LISTADO DE CUOTAS SISTEMA ALEMAN
        const arrayCuotasAleman = arrayInteresAleman.map((interes, index) => `\nCuota nro. ${index + 1} = ${(parseFloat(caso1.amortizacionAleman()) + parseFloat(interes.valor)).toFixed(2)}`);
        //FIN SISTEMA ALEMAN


        // IMPRIMIR RESULTADOS EN PANTALLA 


        //TITULO PARA SISTEMA RFRANCES
        $('.titulo-seccion1').prepend(`<h3 class="titulo-valores" style="display: none">RESULTADOS SEGÚN SISTEMA FRANCES</h3>`);


        //INCORPORA EN EL DOM UN LISTADO CON EL CONTENIDO DEL ARRAY DE CUOTAS 
        for (const cuotas of arrayCuotas) {
            $('#cuota').append(`<li class="listas" style="display: none">${cuotas.texto} ${cuotas.valor}</li>`);
        }
        //FIN LISTADO CUOTAS

        //INCORPORA EN EL DOM UN LISTADO CON EL CONTENIDO DEL ARRAY DE INTERES X CADA CUOTA
        for (const interes of arrayIneteres) {
            $('#interes').append(`<li class="listas" style="display: none">${interes}</li>`);
        }
        //FIN LISTADO DE INTERESES

        //INCORPORA EN EL DOM UN LISTADO CON EL CONTENIDO DEL ARRAY DE AMORTIZACIÓN X CADA CUOTA
        for (const amortizacion of arrayAmortizacionFrances) {
            $('#amortizacion').append(`<li class="listas" style="display: none">${amortizacion.texto} ${amortizacion.valor}</li>`);
        }
        //FIN DE LISTADO AMORTIZACION

        //INCORPORA EN EL DOM UN LISTADO CON EL CONTENIDO DEL ARRAY DE SALDO DE DEUDA X CADA CUOTA
        for (const saldo of arraySaldoDeuda) {
            $('#saldo-deuda').append(`<li class="listas" style="display: none">${saldo}</li>`)
        }
        //FIN LISTADO SALDO DE DEUDA


        // TITULO PARA SISTEMA ALEMAN
        $('.titulo-seccion2').prepend(`<h3 class="titulo-valores" style="display: none">RESULTADOS SEGÚN SISTEMA ALEMAN</h3>`);


        //INCORPORA EN EL DOM UN LISTADO CON EL CONTENIDO DEL ARRAY DE CUOTAS 
        for (const cuotas of arrayCuotasAleman) {
            $('#cuotaAleman').append(`<li class="listas" style="display: none">${cuotas}</li>`);
        }
        //FIN LISTADO CUOTAS

        //INCORPORA EN EL DOM UN LISTADO CON EL CONTENIDO DEL ARRAY DE INTERES X CADA CUOTA
        for (const interes of arrayInteresAleman) {
            $('#interesAleman').append(`<li class="listas" style="display: none">${interes.texto} ${interes.valor}</li>`);
        }
        //FIN LISTADO DE INTERESES

        //INCORPORA EN EL DOM UN LISTADO CON EL CONTENIDO DEL ARRAY DE AMORTIZACIÓN X CADA CUOTA
        for (const amortizacion of arrayAmortizacionAleman) {
            $('#amortizacionAleman').append(`<li class="listas" style="display: none">${amortizacion.texto} ${amortizacion.valor}</li>`);
        }
        //FIN DE LISTADO AMORTIZACION

        //INCORPORA EN EL DOM UN LISTADO CON EL CONTENIDO DEL ARRAY DE SALDO DE DEUDA X CADA CUOTA
        for (const saldo of arraySaldoDeudaAleman) {
            $('#saldo-deudaAleman').append(`<li class="listas" style="display: none">${saldo.texto} ${saldo.valor}</li>`)
        }
        //FIN LISTADO SALDO DE DEUDA

        //FIN IMPRIMIR RESULTADOS EN PANTALLA

        // EFECTOS
        $('.titulo-valores').fadeIn('slow');
        $('.listas').slideDown('slow');

    });
});