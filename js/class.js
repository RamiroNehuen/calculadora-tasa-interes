class BaseCalc {
    constructor(TNA, int, cantCuotas, valorPrestamo) {
        this.TNA = TNA;
        this.int = int;
        this.cantCuotas = cantCuotas;
        this.valorPrestamo = valorPrestamo;
    }

    //MÉTODO PARA DETERMINRAR EL VALOR DEL INTERES QUE AFECTA LA PRIMER CUOTA EN AMBOS SISTEMAS
    interes() {
        return parseFloat(this.valorPrestamo) * (this.int / 100);
    }

    // -------SISTEMA FRANCES-------------
    //MÉTODO PARA DETERMINAR EL VALOR DE LA CUOTA EN EL SISTEMA FRANCES
    cuotaDelPrestamo() {
        return parseInt(this.valorPrestamo) * (this.int / 100) / (1 - (1 + (this.int / 100)) ** -parseInt(this.cantCuotas));
    }

    //MÉTODO PARA DETERMINAR LA AMORTIZACIÓN DE LA CUOTA EN EL SISTEMA FRANCES
    amortizacion() {
        return parseFloat(this.cuotaDelPrestamo()) - parseFloat(this.interes());
    }

    // -------SISTEMA ALEMAN-------------
    //MÉTODO PARA DETERMINAR LA AMORTIZACIÓN SISTEMA ALEMAN
    amortizacionAleman() {
        return parseFloat(this.valorPrestamo / this.cantCuotas).toFixed(2);
    }

    // MÉTODO PARA CALCULAR LA CUOTA SISTEMA ALEMAN
    cuotaAleman() {
        return (this.amortizacionAleman + this.interes).toFixed(2);
    }

};