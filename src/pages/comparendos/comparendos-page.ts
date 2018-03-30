import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConstantesApp } from '../../ConstantesApp';
import * as modelos from '../../modelos/raizModelos';


@Component({
    selector: 'comparendos-page',
    templateUrl: 'comparendos-page.html',
})
export class ComparendosPage {

    public comparendos: Array<modelos.Comparendo>;
    public comparendosFiltro: Array<modelos.Comparendo>;
    public abiertos: boolean;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private constantesApp: ConstantesApp) {
        this.comparendos = navParams.get("comparendosList");
        this.abiertos = navParams.get("abiertos");
        this.comparendosFiltro = new Array();
        this.obtenerComparendos();
    }


    /**
     * 
     * 
     * @returns 
     * 
     * @memberOf ComparendosPage
     */
    public obtenerComparendos() {
        if (this.abiertos) {
            for (let comparendo of this.comparendos) {
                if (this.estaAbierto(comparendo)) {
                    this.comparendosFiltro.push(comparendo);
                }
            }
        } else {
            for (let comparendo of this.comparendos) {
                if (!this.estaAbierto(comparendo)) {
                    this.comparendosFiltro.push(comparendo);
                }
            }
        }
    }


    /**
     * valida si el comparendo se encuentra abierto
     * 
     * @private
     * @param {modelos.Comparendo} comparendo 
     * @returns 
     * 
     * @memberOf ComparendosPage
     */
    private estaAbierto(comparendo: modelos.Comparendo) {
        var abierto: boolean = false;
        if (this.constantesApp.ABIERTO_PENDIENTE === comparendo.estado
            || this.constantesApp.ABIERTO_PENDIENTE_PAGO === comparendo.estado) {
            abierto = true;
        }
        return abierto;
    }



}