import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as modelos from '../../modelos/raizModelos';

@Component({
    selector: 'siniestros-page',
    templateUrl: 'siniestros-page.html',
})
export class SiniestrosPage {

    public siniestros: Array<modelos.Siniestro>;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams) {
        this.siniestros = navParams.get("siniestrosList");
    }



}