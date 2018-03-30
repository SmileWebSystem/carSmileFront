import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import * as modelos from '../../modelos/raizModelos';

@Component({
    selector: 'vehiculo-app',
    templateUrl: 'vehiculo.html'
})
export class VehiculoPage {

    public vehiculoData: modelos.Vehiculo;
    public polizaData: modelos.Poliza;


    constructor(
        public navCtrl: NavController,
        public params: NavParams
    ) {
        this.vehiculoData = params.get("vehiculoData");
        this.polizaData = params.get("polizaData");
    }

}