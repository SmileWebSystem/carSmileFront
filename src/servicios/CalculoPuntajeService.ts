import { Injectable } from '@angular/core';

import * as modelos from '../modelos/raizModelos';
import { ConstantesApp } from '../ConstantesApp';

@Injectable()
export class CalculoPuntajeService {


    /**
     * Creates an instance of CalculoPuntajeService.
     * @param {ConstantesApp} constantesApp 
     * 
     * @memberOf CalculoPuntajeService
     */
    constructor(
        private constantesApp: ConstantesApp
    ) { }




    /**
     * Realiza el calculo del puntaje para el vehiculo
     * @param {modelos.HistoriaVehiculo} historial 
     * @returns Puntaje.ts modelo que la informacion del puntaje
     * 
     * @memberOf CalculoPuntajeService
     */
    calcularPuntajeVehiculo(historial: modelos.HistoriaVehiculo) {
        //console.log(JSON.stringify(historial));
        var puntajeModel: modelos.Puntaje = new modelos.Puntaje();

        puntajeModel.puntajePropietarios = this.calcularPuntajePropietarios(historial.propietarioList);
        puntajeModel.puntajeSiniestros = this.calcularPuntajeSiniestro(historial.siniestroList, historial.poliza.valorAsegurado);
        puntajeModel.puntajeComAbiertos = this.calcularPuntajeComparendosAbiertos(historial.comparendoList);
        puntajeModel.puntajeComCerrados = this.calcularPuntajeComparendosCerrados(historial.comparendoList);

        puntajeModel.puntajeTotal = this.constantesApp.PUNTAJE_MAXIMO + (puntajeModel.puntajePropietarios
            + puntajeModel.puntajeSiniestros
            + puntajeModel.puntajeComAbiertos
            + puntajeModel.puntajeComCerrados);
        //console.log(JSON.stringify(puntajeModel));

        if (puntajeModel.puntajeTotal < 0) {
            puntajeModel.puntajeTotal = 0;
        }
        return puntajeModel;
    }

    /**
     * 
     * Realiza el calculo de los propietarios
     * @param {modelos.Propietario[]} propietarios 
     * @returns puntaje total de los propietarios
     * 
     * @memberOf CalculoPuntajeService
     */
    calcularPuntajePropietarios(propietarios: modelos.Propietario[]) {
        var puntaje: number = 0;

        //console.log('Total propietarios: ' + propietarios.length);
        puntaje = propietarios.length * this.constantesApp.REGLA_PROPIETARIO;
        return puntaje;
    }

    /**
     * Realiza el calculo de los comparendos abiertos
     * @param {modelos.Comparendo[]} comparendos 
     * @returns puntaje total
     * 
     * @memberOf CalculoPuntajeService
     */
    calcularPuntajeComparendosAbiertos(comparendos: modelos.Comparendo[]) {
        var puntaje: number = 0;
        var contador:number = 0;
        for (let comparendo of comparendos) {
            if (this.constantesApp.ABIERTO_PENDIENTE === comparendo.estado
                || this.constantesApp.ABIERTO_PENDIENTE_PAGO === comparendo.estado) {
                    contador++;
            }
        }
        puntaje = this.constantesApp.REGLA_COMP_ABIERTOS * contador;
        return puntaje;
    }

    /**
     * Realiza el calculo de los comparendos cerrados
     * @param {modelos.Comparendo[]} comparendos 
     * @returns puntaje total
     * 
     * @memberOf CalculoPuntajeService
     */
    calcularPuntajeComparendosCerrados(comparendos: modelos.Comparendo[]) {
        var puntaje: number = 0;
        var contador:number = 0;
        for (let comparendo of comparendos) {
            if (this.constantesApp.ABIERTO_PENDIENTE != comparendo.estado
                && this.constantesApp.ABIERTO_PENDIENTE_PAGO != comparendo.estado) {
                    contador++;
            }
        }
        puntaje = this.constantesApp.REGLA_COMP_CERRADOS * contador;        
        return puntaje;
    }



    /**
     * realiza el calculo del puntaje basado en los siniestros
     * @param {modelos.Siniestro[]} siniestros 
     * @returns puntaje total para los siniestros
     * 
     * @memberOf CalculoPuntajeService
     */
    calcularPuntajeSiniestro(siniestros: Array<modelos.Siniestro>, valorVehiculo: number) {
        var puntaje: number = 0;

        if (siniestros != null && siniestros.length > 0) {
            //se calcula el promedio de los siniestros
            var sumaPuntajes: number = 0;
            for (let siniestro of siniestros) {
                sumaPuntajes += this.aplicarReglaSiniestro(valorVehiculo, siniestro.valor);
            }

            var promedio = sumaPuntajes / siniestros.length;
            console.log(sumaPuntajes + ' / ' + siniestros.length + ' = ' + promedio);
            puntaje = promedio * siniestros.length;

        }

        return puntaje;
    }


    /**
     * Por cada siniestro se debe realizar este calculo. 
     * Basado en el monto del vehiculo y el valor del siniestro 
     * se realiza regla de tres y se calcula el porcentaje.
     * @private
     * @param {number} valorVehiculo 
     * @param {number} valorSiniestro 
     * @returns puntaje para el siniestro enviadoo
     * 
     * @memberOf CalculoPuntajeService
     */
    private aplicarReglaSiniestro(valorVehiculo: number, valorSiniestro: number) {
        var puntaje: number = 0;

        var porcentaje = 100 * valorSiniestro / valorVehiculo;
        for (let regla of this.constantesApp.REGLAS_SINIESTROS) {
            if (porcentaje > regla.minimo && porcentaje <= regla.maximo) {
                puntaje = regla.valor;
                break;
            }
        }
        console.log('valorvehiculo: ' + valorVehiculo + ' valorSiniestro: ' + valorSiniestro + ' porcentaje: ' + porcentaje + ' puntaje: ' + puntaje);
        return puntaje;
    }

}