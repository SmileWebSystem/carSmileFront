import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { ConstantesApp } from '../../ConstantesApp';
import * as modelos from '../../modelos/raizModelos';
import { HisorialService } from '../../servicios/HisorialService';
import { ConsultaAutoService } from '../../servicios/ConsultaAutoService';
import { CalculoPuntajeService } from '../../servicios/CalculoPuntajeService';

@Component({
    selector: 'page-historico',
    templateUrl: 'historico.html'
})
export class HistoricoPage {

    public historialVeh: modelos.HistoriaVehiculo;



    /**
     * Creates an instance of HistoricoPage.
     * @param {HisorialService} hisorialService 
     * 
     * @memberOf HistoricoPage
    
     * 
     */
    constructor(
        public hisorialService: HisorialService,
        public consultaAutoService: ConsultaAutoService,
        public calculoPuntajeService: CalculoPuntajeService,
        public loadingCtrl: LoadingController,
        public constantesApp: ConstantesApp,
        public navCtrl: NavController,
        public alertCtrl: AlertController) { }

    /**
     * 
     * @param puntaje 
     */    
    public getColorPuntaje(puntaje: number) {
        return this.consultaAutoService.getColorPuntaje(puntaje);
    }

    /**
     * alerta de confirmacion
     */
    public showConfirm(placa:string) {
        let confirm = this.alertCtrl.create({
            title: 'Consulta Placa',
            message: 'Desea consultar nuevamente este vehiculo?',
            buttons: [
                {
                    text: 'Cancelar',
                    handler: () => {
                        console.log('Cancelar clicked');
                    }
                },
                {
                    text: 'Aceptar',
                    handler: () => {
                        this.consultarPlaca(placa);
                    }
                }
            ]
        });
        confirm.present();
    }

    /**
     * Realiza la consulta de la placa seleccionada
     * @param placa 
     */
    private consultarPlaca(placa:string) {

        let loader = this.loadingCtrl.create({
        content: this.constantesApp.MSG_CONSULTA
      });
      loader.present();

      //consulta placa a trves del servicio rest, retorna un observable
      this.consultaAutoService.consultarDatosVehiculo(placa)
        .subscribe((data: modelos.HistoriaVehiculo) => {          
          this.historialVeh = data;
          var puntaje: modelos.Puntaje = this.calculoPuntajeService.calcularPuntajeVehiculo(this.historialVeh);

          this.consultaAutoService.setHistoriaVehiculo(this.historialVeh);
          this.consultaAutoService.setPuntaje(puntaje);

          loader.dismiss();
          this.navCtrl.parent.select(1);

        }, (error) => {
          loader.dismiss();
          this.showAlert(this.constantesApp.MSG_SUBTITLE_MODAL);
          console.log(error);
        });

    }

    /**
   * muestra modal de alerta
   * 
   * 
   * @memberOf Consulta
   */
  showAlert(subTitle: string) {
    let alert = this.alertCtrl.create({
      title: this.constantesApp.MSG_TITLE_MODAL,
      subTitle: subTitle,
      buttons: [this.constantesApp.MSG_BUTTON_MODAL]
    });
    alert.present();
  }


}


