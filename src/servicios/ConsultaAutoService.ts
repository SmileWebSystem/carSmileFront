import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DataService } from './DataService';
import { ConstantesApp } from '../ConstantesApp';
import { HistoriaVehiculo } from '../modelos/HistoriaVehiculo';
import { Puntaje } from '../modelos/Puntaje';

@Injectable()
export class ConsultaAutoService {

    private actionUrl: String = this.constantesApp.serverWithApiUrl;

    private historiaVehiculo: HistoriaVehiculo;
    private puntaje: Puntaje;

    constructor(
        private constantesApp: ConstantesApp,
        private dataService: DataService
    ) { }

    /**
     * A partir de la placa se consulta la informacion del vehiculo
     */
    public consultarDatosVehiculo = (placa: String): Observable<HistoriaVehiculo> => {
        return this.dataService.Get(this.actionUrl + 'car/estudio/' + placa)
            .map((response: Response) => <HistoriaVehiculo>response.json());
    }



    public getHistorialVehiculo() {
        if (this.historiaVehiculo === null || this.historiaVehiculo === undefined) {
            this.historiaVehiculo = new HistoriaVehiculo();
        }
        return this.historiaVehiculo;

    }

    public setHistoriaVehiculo(historialVeh) {
        this.historiaVehiculo = historialVeh;
    }

    public getPuntaje() {
        if (this.puntaje === null || this.puntaje === undefined) {
            this.puntaje = new Puntaje();
        }
        return this.puntaje;
    }

    public setPuntaje(puntaje) {
        this.puntaje = puntaje;
    }

    /**
     * calcula el color que se le debe asignar al puntaje
     * basado en la tabla de colores
     * @param {number} puntaje 
     * @returns 
     * 
     * @memberOf ConsultaAutoService
     */
    getColorPuntaje(puntaje: number) {
        var colorPuntaje: String;
        for (let color of this.constantesApp.TABLA_COLORES_PUNTAJE) {
            if (puntaje >= color.minimo &&
                puntaje <= color.maximo) {
                colorPuntaje = color.color;
                break;
            }
        }
        return colorPuntaje;
    }

}