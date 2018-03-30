import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { HistoricoDto } from '../modelos/HistoricoDto';
import { ConstantesApp } from '../ConstantesApp';

@Injectable()
export class HisorialService {

    private historicoList: FirebaseListObservable<HistoricoDto[]>;

    constructor(
        private afDB: AngularFireDatabase,
        private constantesApp: ConstantesApp) {
    }

    /**
     * 
     * 
     * 
     * @memberOf HisorialService
     */
    public cargaHistorico() {
        this.historicoList = this.afDB.list(this.constantesApp.LISTA_HISTORICO);
    }

    /**
     * 
     * 
     * @param {string} placa 
     * @param {number} puntaje 
     * 
     * @memberOf HisorialService
     */
    public guardarHistorico(placa: String, puntaje: number) {
        var historico: HistoricoDto = new HistoricoDto();
        historico.placa = placa;
        historico.puntaje = puntaje;
        historico.fecha = new Date().toLocaleString();
        this.getHistoricoList().push(historico);
    }

    public getHistoricoList() {
        return this.historicoList;
    }

    



}