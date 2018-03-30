import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {PuntajePage} from '../puntaje/puntaje';
import { ConstantesApp } from '../../ConstantesApp';
import { ConsultaAutoService } from '../../servicios/ConsultaAutoService';
import { CalculoPuntajeService } from '../../servicios/CalculoPuntajeService';
import { StorageService } from '../../servicios/StorageService';
import { HisorialService } from '../../servicios/HisorialService';
import * as modelos from '../../modelos/raizModelos';

@Component({
  selector: 'consulta-home',
  templateUrl: 'consulta.html'
})
export class Consulta {

  public placa: String;
  public historialVeh: modelos.HistoriaVehiculo;



  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private consultaAutoService: ConsultaAutoService,
    private calculoPuntajeService: CalculoPuntajeService,
    private storageService: StorageService,
    private hisorialService: HisorialService,
    public alertCtrl: AlertController,
    public constantesApp: ConstantesApp,
    public storage: Storage
  ) {

  }

  
  ngOnInit() {
    console.log("---PostConstruct consulta---");
    this.hisorialService.cargaHistorico();
  }


  /**
   * 
   * 
   * 
   * @memberOf Consulta
  
   * 
   */
  consultarPlaca() {
    if (this.validarPlaca()) {
      let loader = this.loadingCtrl.create({
        content: this.constantesApp.MSG_CONSULTA
      });
      loader.present();

      //consulta placa a trves del servicio rest, retorna un observable
      this.consultaAutoService.consultarDatosVehiculo(this.placa)
        .subscribe((data: modelos.HistoriaVehiculo) => {
          console.log('Result: ' + data.vehiculo.placa);
          this.historialVeh = data;
          var puntaje: modelos.Puntaje = this.calculoPuntajeService.calcularPuntajeVehiculo(this.historialVeh);

          this.consultaAutoService.setHistoriaVehiculo(this.historialVeh);
          this.consultaAutoService.setPuntaje(puntaje);

          //se almacena en historico de firebase
          this.hisorialService.guardarHistorico(this.historialVeh.vehiculo.placa,
            puntaje.puntajeTotal);

          this.placa = null;
          loader.dismiss();
          this.navCtrl.parent.select(1);

        }, (error) => {
          loader.dismiss();
          this.showAlert(this.constantesApp.MSG_SUBTITLE_MODAL);
          console.log(error);
        });


      //TODO codigo demo para realizar pruebas
      /*this.historialVeh = data;
       var puntaje: modelos.Puntaje = this.calculoPuntajeService.calcularPuntajeVehiculo(this.historialVeh);
       this.storage.ready().then(() => {
   
         this.storage.remove(this.constantesApp.KEY_PUNTAJE).then(() => {
           this.storage.set(this.constantesApp.KEY_PUNTAJE, puntaje);
   
           this.storage.remove(this.constantesApp.KEY_HISTORIA).then(() => {
             this.storage.set(this.constantesApp.KEY_HISTORIA, this.historialVeh);
   
             //se almacena en historico de firebase
             this.hisorialService.guardarHistorico(this.historialVeh.vehiculo.placa,
               puntaje.puntajeTotal);
   
             this.placa = null;
             
             this.navCtrl.parent.select(1);
             //this.navCtrl.push(PuntajePage);
             
   
   
           }).catch(() => {
             this.storage.set(this.constantesApp.KEY_HISTORIA, this.historialVeh);
           });
         }).catch(() => {
           this.storage.set(this.constantesApp.KEY_PUNTAJE, puntaje);
         });
       },
         (error) => {
   
           this.showAlert();
           console.log(error);
         });*/
      //FIN codigo demo

    } else {
      this.showAlert(this.constantesApp.MSG_VALIDACION_PLACA);

    }
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

  /**
   * valida que la placa ingresada sea valida
   */
  private validarPlaca() {
    var valido: boolean = true;

    if (this.placa === null || this.placa === undefined) {
      valido = false;
    } else {
      if (this.placa.length != 6) {
        valido = false;
      }
    }
    return valido;
  }



}

/**
 * Data demo para realizar pruebas
 */
/*var data =
  {
    "comparendoList": [
      {
        "descripcion": "C02 Estacionar un vehículo en sitios prohibidos.",
        "estado": "No vigente",
        "fecha": "2016-07-08T00:00:00",
        "valor": 344730
      },
      {
        "descripcion": "C29 Conducir un vehículo a velocidad superior a la máxima permitida.",
        "estado": "Pendiente de pago",
        "fecha": "2016-04-30T00:00:00",
        "valor": 344727
      },
      {
        "descripcion": "C29 Conducir un vehículo a velocidad superior a la máxima permitida.",
        "estado": "Pendiente",
        "fecha": "2013-10-27T00:00:00",
        "valor": 294750
      },
      {
        "descripcion": "47 Transitar por sitios restringidos o en horas prohibidas por la autoridad competente. Además, el vehículo será inmovilizado.",
        "estado": "Pagado",
        "fecha": "2011-09-30T00:00:00",
        "valor": 267800
      },
      {
        "descripcion": "47 Transitar por sitios restringidos o en horas prohibidas por la autoridad competente. Además, el vehículo será inmovilizado.",
        "estado": "Anulado",
        "fecha": "2011-09-29T00:00:00",
        "valor": 267800
      },
      {
        "descripcion": "35 Estacionar un vehículo en sitios prohibidos.",
        "estado": "Anulado",
        "fecha": "2011-09-16T00:00:00",
        "valor": 267800
      },
      {
        "descripcion": "35 Estacionar un vehículo en sitios prohibidos.",
        "estado": "Anulado",
        "fecha": "2011-08-11T00:00:00",
        "valor": 267800
      },
      {
        "descripcion": "35 Estacionar un vehículo en sitios prohibidos.",
        "estado": "Anulado",
        "fecha": "2011-05-09T00:00:00",
        "valor": 267800
      },
      {
        "descripcion": "C29 Conducir un vehículo a velocidad superior a la máxima permitida.",
        "estado": "Pendiente de pago",
        "fecha": "2016-03-08T00:00:00",
        "valor": 0
      },
      {
        "descripcion": "35 Estacionar un vehículo en sitios prohibidos.",
        "estado": "No vigente",
        "fecha": "2009-12-08T00:00:00",
        "valor": 0
      }
    ],
    "poliza": {
      "codCompania": "501",
      "compania": "SOLIDARIA",
      "fechaFinVigencia": "2012-12-31T00:00:00",
      "fechaVigencia": "2011-12-31T00:00:00",
      "numPoliza": "994000000054",
      "valorAsegurado": 157000000,
      "vigente": "NO"
    },
    "propietarioList": [
      {
        "nombre": "MDN - EJERCITO NACIONAL - JEFA",
        "numeroDocumento": "8001306324",
        "tipoDocumento": "NIT"
      }
    ],
    "siniestroList": [],
    "vehiculo": {
      "chasis": "130DITRA",
      "clase": "CAMION",
      "marca": "CHEVROLET",
      "modelo": "2011",
      "motor": "130DITRA",
      "placa": "ABC130",
      "tipo": "KODIAK 228 MT TD 4X2"
    }

  }*/