import { Component, OnInit, Input } from '@angular/core';
import { CmsService } from '../../../services/cms/cms.service';

@Component({
  selector: 'app-slide-home',
  templateUrl: './slide-home.component.html',
  styleUrls: ['./slide-home.component.css']
})
export class SlideHomeComponent implements OnInit {
  @Input() perfil: string;
  slideHome: any = [];
  elementoCopia: any;
  constructor(private cmsService: CmsService) { }

  ngOnInit() {
      this.getSlideHome();      
  } 

  getSlideHome() {
    let slideDataCached = this.cmsService.getSlideHomeCache();
    console.log('slideDataCached.length', slideDataCached.length);
    if (slideDataCached.length == 0) {
      this.cmsService.getSlideHome()
        .subscribe(result => {
          console.log('getSlidesHome result',result);
          this.cmsService.setSlideHomeCache(result);
          this.showSlide(result);
        },
          error => {
            console.log('error', error);
          }
        );
    } else {
      this.showSlide(slideDataCached);
    }
  }

  showSlide(data) {
    let width = window.innerWidth;
    let obj: any = [];
    let newobj: any = [];
    obj = data;
    obj.forEach(element => {
      if (element.habilitado) {
        if (width > 1000) {
          element.urlImagen = element.imagen.urlImagen;
        } else {
          element.urlImagen = element.imagenMobile.urlImagen;
        }
        element.urlImagen = encodeURI(element.urlImagen);
        
          newobj.push(element);
        
      }
    });
    newobj.sort((a, b) => (a.posicion > b.posicion) ? 1 : ((b.posicion > a.posicion) ? -1 : 0));
    this.slideHome = newobj;
    console.log('this.slideHome', this.slideHome);
  }

}
