import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class StorageService {

    public valor: Object;

    constructor(
        public storage: Storage
    ) { }


    /**
     * 
     * 
     * @param {string} key 
     * @param {any} puntaje 
     * 
     * @memberOf StorageService
     */
    public guardarDatos(key: string, objeto) {
        this.storage.ready().then(() => {
            this.storage.set(key, objeto);
        });
    }
}