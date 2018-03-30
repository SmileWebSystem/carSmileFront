import { Comparendo } from './Comparendo';
import { Poliza } from './Poliza';
import { Propietario } from './Propietario';
import { Siniestro } from './Siniestro';
import { Vehiculo } from './Vehiculo';

export class HistoriaVehiculo {
    vehiculo: Vehiculo;
    poliza: Poliza;
    propietarioList: Propietario[];
    siniestroList: Siniestro[];
    comparendoList: Comparendo[];

    constructor() {
        this.vehiculo = new Vehiculo();
        this.poliza = new Poliza();
        this.propietarioList = new Array<Propietario>();
        this.siniestroList = new Array<Siniestro>();
        this.comparendoList = new Array<Comparendo>();

    }


}

