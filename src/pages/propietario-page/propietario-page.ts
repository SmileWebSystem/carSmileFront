import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as modelos from '../../modelos/raizModelos';

/**
 * Generated class for the PropietarioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'propietario-page',
  templateUrl: 'propietario-page.html',
})
export class PropietarioPage {

  public propietarios: Array<modelos.Propietario>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.propietarios = navParams.get("propietariosList");
  }



}
