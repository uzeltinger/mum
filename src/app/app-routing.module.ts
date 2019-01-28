import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HistoriaComponent } from './components/historia/historia.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'historia', component: HistoriaComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    CommonModule
  ],
  declarations: []
})
export class AppRoutingModule { }
