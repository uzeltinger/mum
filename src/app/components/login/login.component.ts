import { Component, OnInit, ElementRef } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  contrasenia: string;
  modalParams = { 'title': '', 'text': '', 'buttonText': '', 'sectioclass': '' };
  showSpinner: boolean = false;
  userLogued: boolean = false;
  constructor(
    private router: Router,
    private _elementRef: ElementRef,
    private loginService: LoginService) { }

  ngOnInit() {
    if( this.loginService.isUserLogued() ){
      this.userLogued = true;
    }    
  }

  onSubmit(formulario) {
    // this.showSpinner = true;
    let data = formulario.form.value;
    console.log('data',data);
    this.showSpinner = true;
    setTimeout(() => {
      if (data.email == 'museomolet@epec.com.ar') {
        if (data.contrasenia == 'Epec+2019') {
          console.log('logueado');
          this.email = data.email;
          let dataSend = { "usuario": data.email, "contrasenia": data.contrasenia };
          this.loginService.setUser(dataSend);
          this.router.navigate(['/contacto']);
        } else {
          //error de clave
          this.showModal();
        }
      } else {
        //error de usuario
        this.showModal();
      }      
    this.showSpinner = false;      
    }, 1000);
  }
  logout(){
    let dataSend = { "usuario": null, "contrasenia": null };
    this.loginService.setUser(dataSend);
    this.userLogued = false;
  }
  showModal() {
    this.modalParams.sectioclass = 'alert';
    this.modalParams.title = "Error.";
    this.modalParams.text = "Error de usuario";
    this.modalParams.buttonText = "Cerrar";
    this._elementRef.nativeElement.querySelector('#open-modal-recibido').click();
  }
}