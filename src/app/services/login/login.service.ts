import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  setUser(data){
    localStorage.setItem('epecUserData', JSON.stringify(data));    
  }

  isUserLogued(){
    let epecUserData = localStorage.getItem('epecUserData');
    console.log('epecUserData',epecUserData);
    if (epecUserData != 'undefined' && epecUserData != null) {
      let user = JSON.parse(localStorage.getItem('epecUserData'));
      if (user.usuario == 'museomolet@epec.com.ar') {
        if (user.contrasenia == 'Epec+2019') {
          return true;
        }
      }
    }
    return false;
  }

  getUser(){
    let epecUserData = localStorage.getItem('epecUserData');
    console.log('epecUserData',epecUserData);
    if (epecUserData != 'undefined' && epecUserData != null) {
      return JSON.parse(localStorage.getItem('epecUserData'));
    }
    return null;
  }
}
