import { Component } from '@angular/core';

import { PuntajePage } from '../puntaje/puntaje';
import { HistoricoPage } from '../historico/historico';
import { Consulta } from '../consulta/consulta';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Consulta;
  tab2Root = PuntajePage;
  tab3Root = HistoricoPage;
  

  constructor() {

  }
}
