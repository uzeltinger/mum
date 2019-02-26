import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CmsService {

  apiEndpoint = environment.apiEndpoint;
  slideHome: any = [];
  //apiEndpointDev = null;
  //apiEndpointDev = 'http://192.168.109.151:8070';
  apiEndpointDev = 'http://127.0.0.1:8080/';
  query: string = "";
  resultsCached: any= null;
  destacadosCached: any= [];
  articulosFaqCached: any = [];  
  informesCached: any = [];

  constructor(private httpClient: HttpClient) { }
  getSlideHome() {
    if (this.apiEndpointDev != null) {
      return this.httpClient.get(this.apiEndpointDev + "/slides/home");
    } else {
      return this.httpClient.get("/media/cms/slidesHome.json");
    }
  }
  getSlideHomeCache() {
    return this.slideHome;
  }
  setSlideHomeCache(data) {
    this.slideHome = data;
  }

  getComments() {
    if (this.apiEndpointDev != null) {
      return this.httpClient.get(this.apiEndpointDev + "/comentarios");
    } else {
      return this.httpClient.get("/media/cms/comentarios.json");
    }
  }
  saveComment(comentario){
    let httpOptions = this.getHeader();
    return this.httpClient.post(this.apiEndpointDev + "comentarios", comentario, httpOptions)
    .pipe(
      //console.log('showComment service');
    );
  }
  deleteComment(cId){
    let httpOptions = this.getHeader();
    return this.httpClient.delete(this.apiEndpointDev + "comentarios/"+cId, httpOptions)
    .pipe(
      //console.log('showComment service');
    );
  }
  sendSolicitud(data){
    let httpOptions = this.getHeader();
    return this.httpClient.post(this.apiEndpointDev + "solicitudVisita", data, httpOptions)
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
