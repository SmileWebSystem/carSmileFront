export class Puntaje {
    puntajeTotal: number;
    puntajePropietarios: number;
    puntajeSiniestros: number;
    puntajeComAbiertos: number;
    puntajeComCerrados: number;

    constructor() {
        this.puntajeComAbiertos = 0;
        this.puntajeComCerrados = 0;
        this.puntajePropietarios = 0;
        this.puntajeSiniestros = 0;
        this.puntajeTotal = 0;
    }
}