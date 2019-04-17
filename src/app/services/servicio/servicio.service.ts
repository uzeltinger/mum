import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  apiEndpoint = environment.apiEndpoint;
  //apiEndpointDev = null;
  apiEndpointDev = 'http://localhost:8090/';
  //apiEndpointDev = "http://192.168.109.47:8040/";
  
  constructor(private httpClient: HttpClient) { }


  sendSolicitud(data): Observable<any> {
    let httpOptions = this.getHeader();
    return this.httpClient.post(this.apiEndpointDev + "nuevas-visitas", data, httpOptions)
    .pipe(
      //console.log('showComment service');
    );
  }
  
  sendComentario(data): Observable<any> {
    let httpOptions = this.getHeader();
    return this.httpClient.post(this.apiEndpointDev + "comentarios", data, httpOptions)
    .pipe(
      //console.log('showComment service');
    );
  }

  getPonderables(): Observable<any> {
    if (this.apiEndpointDev != null) {
      let httpOptions = this.getHeader();
      return this.httpClient.get(this.apiEndpointDev + "comentarios/ponderables", httpOptions);
    } else {
      return this.httpClient.get("/media/cms/ponderables.json");
    }
  }

  getComments(): Observable<any> {
    if (this.apiEndpointDev != null) {
      let httpOptions = this.getHeader();
      return this.httpClient.get(this.apiEndpointDev + "comentarios", httpOptions);
    } else {
    return this.httpClient.get("/media/cms/comentarios.json");
    }
  }

  getCommentsModerate(): Observable<any> {
    if (this.apiEndpointDev != null) {
      let httpOptions = this.getHeader();
      return this.httpClient.get(this.apiEndpointDev + "comentarios/moderar", httpOptions);
    } else {
    return this.httpClient.get("/media/cms/comentarios.json");
    }
  }

  saveComment(comentario){
    let httpOptions = this.getHeader();
    return this.httpClient.post(this.apiEndpointDev + "comentarios/moderar", comentario, httpOptions)
    .pipe(
      //console.log('showComment service');
    );
  }

  getHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
}
