import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { PuntajePage } from '../pages/puntaje/puntaje';
import { HistoricoPage } from '../pages/historico/historico';
import {VehiculoPage} from '../pages/vehiculo/VehiculoPage';
import {PropietarioPage} from '../pages/propietario-page/propietario-page';
import {SiniestrosPage} from '../pages/siniestros-page/siniestros-page';
import {ComparendosPage} from '../pages/comparendos/comparendos-page';


import { Consulta } from '../pages/consulta/consulta';
import { TabsPage } from '../pages/tabs/tabs';
import { DataService } from '../servicios/DataService';
import {ConstantesApp} from '../ConstantesApp';
import {ConsultaAutoService} from '../servicios/ConsultaAutoService';
import {CalculoPuntajeService} from '../servicios/CalculoPuntajeService';
import {HisorialService} from '../servicios/HisorialService';
import {StorageService} from '../servicios/StorageService';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


export const firebaseConfig = {
  apiKey: "AIzaSyAnRWB8BTw4E40yHi4XwtobPrDPRELX1Ts",
  authDomain: "smilecarweb.firebaseapp.com",
  databaseURL: "https://smilecarweb.firebaseio.com",
  projectId: "smilecarweb",
  storageBucket: "smilecarweb.appspot.com",
  messagingSenderId: "757582318542"
};


@NgModule({
  declarations: [
    MyApp,
    PuntajePage,
    HistoricoPage,
    PropietarioPage,
    ComparendosPage,
    SiniestrosPage,
    VehiculoPage,
    Consulta,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,    
    FormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PuntajePage,
    HistoricoPage,
    VehiculoPage,
    PropietarioPage,
    ComparendosPage,
    SiniestrosPage,
    Consulta,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,    
    ConstantesApp,
    DataService,
    ConsultaAutoService,
    CalculoPuntajeService,
    HisorialService,
    StorageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
