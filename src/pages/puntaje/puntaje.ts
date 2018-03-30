import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { VehiculoPage } from '../vehiculo/VehiculoPage';
import { PropietarioPage } from '../propietario-page/propietario-page';
import { SiniestrosPage } from '../siniestros-page/siniestros-page';
import { ComparendosPage } from '../comparendos/comparendos-page';
import { ConsultaAutoService } from '../../servicios/ConsultaAutoService';
import { StorageService } from '../../servicios/StorageService';
import { ConstantesApp } from '../../ConstantesApp';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-puntaje',
  templateUrl: 'puntaje.html'
})
export class PuntajePage {

  /**
   * Creates an instance of PuntajePage.
   * @param {NavController} navCtrl 
   * @param {NavParams} params 
   * 
   * @memberOf PuntajePage
   */
  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    private storageService: StorageService,
    public constantesApp: ConstantesApp,
    public alertCtrl: AlertController,
    public consultaAutoService: ConsultaAutoService,
    public storage: Storage
  ) {    }

  ngOnInit() {
    

  }

  public getHistorialVehiculo() {
    return this.consultaAutoService.getHistorialVehiculo();
  }

  public getResultadoPuntaje() {
    return this.consultaAutoService.getPuntaje()
  }



  public mostrarDatosVehiculo() {
    this.navCtrl.push(VehiculoPage, {
      vehiculoData: this.getHistorialVehiculo().vehiculo,
      polizaData: this.getHistorialVehiculo().poliza
    });
  }

  public consultaPropietarios() {
    this.navCtrl.push(PropietarioPage, {
      propietariosList: this.getHistorialVehiculo().propietarioList
    });

  }

  public consultaSiniestros() {
    this.navCtrl.push(SiniestrosPage, {
      siniestrosList: this.getHistorialVehiculo().siniestroList
    });
  }

  public consultaComparendosAbiertos() {
    this.navCtrl.push(ComparendosPage, {
      comparendosList: this.getHistorialVehiculo().comparendoList,
      abiertos: true
    });
  }

  public consultaComparendosCerrados() {
    this.navCtrl.push(ComparendosPage, {
      comparendosList: this.getHistorialVehiculo().comparendoList,
      abiertos: false
    });
  }



  /**
   * 
   * retorna el color calculado para el puntaje
   * @returns 
   * 
   * @memberOf PuntajePage
   */
  getColorPuntaje(puntaje:number) {
    return this.consultaAutoService.getColorPuntaje(puntaje);
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: this.constantesApp.MSG_TITLE_MODAL,
      subTitle: this.constantesApp.MSG_PUNTAJE_NULO,
      buttons: [this.constantesApp.MSG_BUTTON_MODAL]
    });
    alert.present();
  }




}
