import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    //private headers: Headers;
    //private options: RequestOptions;


    constructor(
        private http: Http

    ) { }

    public buildHeaders(contentJSON: Boolean) {
        let headers = new Headers();
        if (contentJSON) headers.append('Content-Type', 'application/json');
        //headers.append(this._constAplicacion.HEADER_SESSION_CONTEXT, JSON.stringify(obj));
        //headers.append(this._constAplicacion.HEADER_AUTHORIZATION, token);
        return headers;
    }

    public buildOptions() {
        let options = new RequestOptions({ headers: this.buildHeaders(true) });
        return options;
    }


    public Get = (url: string): Observable<Response> => {
        return this.http.get(url, this.buildOptions());

    }

    public Post = (url: string, body: Object): Observable<Response> => {
        return this.http.post(url, JSON.stringify(body), this.buildOptions())
    }


    public Put = (url: string, body: Object): Observable<Response> => {
        return this.http.put(url, JSON.stringify(body), this.buildOptions())
    }

    public Delete = (url: string, body: Object): Observable<Response> => {
        return this.http.delete(url, this.buildOptions())

    }

  /*  private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    */


}