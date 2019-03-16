import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  apiEndpoint = environment.apiEndpoint;
  //apiEndpointDev = null;
  //apiEndpointDev = 'http://localhost:8090/';
  apiEndpointDev = "http://192.168.109.47:8040/";
  
  constructor(private httpClient: HttpClient) { }


  sendSolicitud(data){
    let httpOptions = this.getHeader();
    return this.httpClient.post(this.apiEndpointDev + "nuevas-visitas", data, httpOptions)
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
