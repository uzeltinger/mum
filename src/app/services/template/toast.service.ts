import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastMessage:any = {};

  constructor() { 
    this.toastMessage.show=false;
    this.toastMessage.content='nada';
    this.toastMessage.style='info';
  }

  addToastMessage(vars:any){
    this.toastMessage.show=vars.show;
    this.toastMessage.content=vars.content;
    this.toastMessage.style=vars.style;
  }

  dismissToastMessage() {
    this.toastMessage = [];
  }
}



