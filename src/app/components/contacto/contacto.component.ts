import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  ancla: string;
  recibidoParams = { 'title': '', 'text': '', 'buttonText': '', 'sectioclass': '' };

  constructor(private route: ActivatedRoute,
    private _elementRef: ElementRef) { }

  latitude: any;
  longitude: any;
  iconImage = 'assets/template/images/marcador-epec-verde.png';
  sowingMaps: boolean = true;

  ngOnInit() {
    this.route.params.subscribe((params: ParamMap) => {
      this.ancla = params['ancla'];
      console.log('ancla', this.ancla);
      if (this.ancla == 'recibido') {
        /*/contacto/recibido*/
        this.recibidoParams.title = "Consulta enviada.";
        this.recibidoParams.text = "Su consulta ha sido enviada.<br>Nos comunicaremos con ud. a la brevedad.<br>¡Muchas gracias!.";
        this.recibidoParams.buttonText = "Listo";
        this._elementRef.nativeElement.querySelector('#open-modal-recibido').click();
      }
    });
    this.cargarMapas();
  }
  modalRecibidoCloseClicked() {

  }

  cargarMapas(){
    this.loadMap();
    this.sowingMaps = true;
}

  loadMap() {
    let mapProp = {
      center: new google.maps.LatLng(-31.3620549, -64.4258404),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.addMarker(new google.maps.LatLng(-31.3620549, -64.4258404), this.map, this.iconImage, 'EPEC');

  }

  addMarker(location_, map_, iconImage_, title_) {
    let marker = new google.maps.Marker({
      position: location_,
      map: map_,
      icon: iconImage_,
      title: title_
    });
    return marker;
  }

  goLibroDeVisitas(){
    let el = document.getElementById("libro-de-visitas");
    el.scrollIntoView();
  }
  
  goToFormularioVisitasGuiadas(){
    console.log('goToFormularioVisitasGuiadas');
    setTimeout(() => {      
    let el = document.getElementById("formulario-visitas-guiadas");
    el.scrollIntoView();
    }, 200);
  }
}
