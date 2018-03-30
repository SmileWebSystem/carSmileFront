import { Injectable } from '@angular/core';
import { ReglaSiniestros } from './modelos/ReglaSiniestros';
import { ColoresPuntaje } from './modelos/ColoresPuntaje';

@Injectable()
export class ConstantesApp {

    /**
     * Ruta de consumo de los servivios REST
     */
    //private AMBIENTE_SERVICIOS_REST = "http://localhost:8012/";
    private AMBIENTE_SERVICIOS_REST = "https://smile-car-back.herokuapp.com/";    
    private RAIZ_SERVICIOS_REST = "services/";
    public serverWithApiUrl = this.AMBIENTE_SERVICIOS_REST + this.RAIZ_SERVICIOS_REST;

    /**
     * Definicion de reglas
     */
    //indica cuanto se resta al puntaje total por cada propietario
    public REGLA_PROPIETARIO: number = -4.5;
    //indica cuanto se resta al puntaje total por cada comparendo cerrado
    public REGLA_COMP_CERRADOS: number = -2;
    //indica cuanto se resta al puntaje total por cada comparendo abierto
    public REGLA_COMP_ABIERTOS: number = -12;

    //tabla donde se valida el puntaje para un siniestro dado
    public REGLAS_SINIESTROS: Array<ReglaSiniestros> = [
        { minimo: 0, maximo: 10, valor: -20 },
        { minimo: 10, maximo: 20, valor: -30 },
        { minimo: 20, maximo: 40, valor: -50 },
        { minimo: 40, maximo: 60, valor: -70 },
        { minimo: 60, maximo: 100, valor: -90 },
    ];

    //comparendos abiertos
    public ABIERTO_PENDIENTE_PAGO: String = "Pendiente de pago";
    public ABIERTO_PENDIENTE: String = "Pendiente";

    //colores puntaje
    public TABLA_COLORES_PUNTAJE: Array<ColoresPuntaje> = [
        { minimo: 0, maximo: 64.0, color: "#F80F0F" },
        { minimo: 64.1, maximo: 74.0, color: "#F9F906" },
        { minimo: 74.1, maximo: 86.0, color: "#488aff" },
        { minimo: 86.1, maximo: 100, color: "#32db64" },
    ];


    /**
     * Constantes globales app
     */
    //puntajue maximo que puede tener un vehiculo
    public PUNTAJE_MAXIMO: number = 100;


    /**
     * Mensajes
     */
    public MSG_CONSULTA: string = "Realizando Consulta...";
    public MSG_TITLE_MODAL: string = "OPS!";
    public MSG_SUBTITLE_MODAL: string = "Ocurrió un problema en la consulta del vehículo. Intente mas tarde!";
    public MSG_SUBTITLE_MODAL_DATA: string = "No se encontraron datos para la placa consultada.";
    public MSG_BUTTON_MODAL: string = "OK";
    public MSG_VALIDACION_PLACA = "Ingrese un placa valida.";
    public MSG_PUNTAJE_NULO = "No existe puntaje aun.";

    /*
    * DATA
    */
    public KEY_PUNTAJE: string = "kpu";
    public KEY_HISTORIA: string = "khis";

    /**
     * Firebase
     */
    //public LISTA_HISTORICO:string = "/consultas"; //Produccion
    public LISTA_HISTORICO: string = "/consultas_desa"; //Desarrollo

}