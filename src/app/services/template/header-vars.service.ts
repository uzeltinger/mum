import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderVarsService {
  variables: string[] = [];
  headerVars:any = {};
  entre: string = '';

  addHeaderVars(vars:any){
    this.headerVars.showTopReturn=vars.showTopReturn;
    this.headerVars.returnText=vars.returnText;
    this.headerVars.returnUrl=vars.returnUrl;
    this.headerVars.volverAtras=vars.volverAtras;
  }
  entreEnPerfil(perfil){
    this.entre = perfil;
    console.log('entreEnPerfil',perfil);
  }
  getEntreEnPerfil(){
    console.log('getEntreEnPerfil',this.entre);
    return this.entre;
  }
  clear() {
    this.headerVars = [];
  }

  constructor() { }
}