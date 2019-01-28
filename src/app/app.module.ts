import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GoTopButtonModule } from 'ng2-go-top-button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { HeaderComponent } from './components/template/header/header.component';
import { SlideHomeComponent } from './components/modulos/slide-home/slide-home.component';
import { HistoriaComponent } from './components/historia/historia.component';

@NgModule({
  declarations: [
    AppComponent,
    SlideHomeComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    HistoriaComponent
  ],
  imports: [
    BrowserModule, RouterModule, AppRoutingModule, BrowserAnimationsModule, GoTopButtonModule,   
    HttpClientModule  
  ],
  providers: [],
  exports: [GoTopButtonModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
