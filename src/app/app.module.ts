import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GoTopButtonModule } from 'ng2-go-top-button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { HeaderComponent } from './components/template/header/header.component';
import { SlideHomeComponent } from './components/modulos/slide-home/slide-home.component';
import { HistoriaComponent } from './components/historia/historia.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { SalasComponent } from './components/salas/salas.component';
import { LoginComponent } from './components/login/login.component';
import { ServicioService } from './services/servicio/servicio.service';
import { ConstanciaComponent } from './components/template/constancia/constancia.component';

@NgModule({
  declarations: [
    AppComponent,
    SlideHomeComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    HistoriaComponent,
    ContactoComponent,
    SalasComponent,
    LoginComponent,
    ConstanciaComponent
  ],
  imports: [
    BrowserModule, RouterModule, AppRoutingModule, BrowserAnimationsModule, GoTopButtonModule,   
    HttpClientModule, FormsModule
  ],
  providers: [
    ServicioService
  ],
  exports: [GoTopButtonModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
