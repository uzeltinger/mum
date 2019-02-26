import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { } from '@types/googlemaps';
import { LoginService } from 'src/app/services/login/login.service';
import { CmsService } from 'src/app/services/cms/cms.service';

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
  modalParams = {'title':'','text':'','buttonText':'','buttonAction':''};
  showSpinner: boolean = false;
  latitude: any;
  longitude: any;
  iconImage = 'assets/template/images/marcador-epec-verde.png';
  sowingMaps: boolean = true;
  userLogued: boolean = false;
  comentarios: any = [];
  estrellas: any = [1, 2, 3, 4, 5];
  estrellasAtencion: number = 0;
  estrellasFacilidad: number = 0;
  estrellasEntorno: number = 0;
  estrellasGeneral: number = 0;
  estrellasSeleccionadas: number[] = [];
  borrarComentarioObject: any;

  constructor(private route: ActivatedRoute,
    private loginService: LoginService, private cmsService: CmsService,
    private _elementRef: ElementRef) { }



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
    if (this.loginService.isUserLogued()) {
      this.userLogued = true;
      console.log('this.userLogued', this.userLogued);
    }
    this.getComments();
    this.estrellasSeleccionadas[1] = 0;
    this.estrellasSeleccionadas[2] = 0;
    this.estrellasSeleccionadas[3] = 0;
    this.estrellasSeleccionadas[4] = 0;
  }

  getComments() {
    this.cmsService.getComments()
      .subscribe(result => {
        let comentarios: any = result;
        if(!this.userLogued){
          comentarios.forEach(element => {
            if(element.estado == 0){
              element.estado = 9;
            }            
          });
          this.comentarios = comentarios;
        }else{
          this.comentarios = result;
        }        
      },
        error => {
          console.log('error', error);
        }
      );
  }

  setEstrellas(tipo: number, cantidad: number){
    console.log('tipo', tipo);
    console.log('cantidad', cantidad);
    this.estrellasSeleccionadas[tipo] = cantidad;
  }

  onSubmit(formulario) {
    // this.showSpinner = true;
    let data = formulario.form.value;
    data.atencion = this.estrellasSeleccionadas[1];
    data.facilidad = this.estrellasSeleccionadas[2];
    data.entorno = this.estrellasSeleccionadas[3];
    data.general = this.estrellasSeleccionadas[4];
    console.log('data', data);
    this.showSpinner = true;
    
    setTimeout(() => {
      this.showSpinner = false;
      this.recibidoParams.sectioclass = '';
      this.recibidoParams.title = "Exito.";
      this.recibidoParams.text = "Gracias por enviar su comentario";
      this.recibidoParams.buttonText = "Cerrar";
      this._elementRef.nativeElement.querySelector('#open-modal-recibido').click();
    }, 1000);
      
        //error de usuario
        //this.showModal();
    
  }

  actionConfirmedClicked() {
    this.cmsService.deleteComment(this.borrarComentarioObject.id)
      .subscribe(result => {
        this.borrarComentarioObject.estado = 9;
      },
        error => {
          console.log('error', error);
        }
      );
  }

  borrarComentario(comentario){
    console.log('borrarComentario');
    this.borrarComentarioObject = comentario;
    this.modalParams.title = "Cuidado.";
    this.modalParams.text = "Está seguro que desea eliminar el comentario?";
    this.modalParams.buttonText = "Borrar";
    this.modalParams.buttonAction = "actionConfirmedClicked";
    this._elementRef.nativeElement.querySelector('#open-modal-confirm').click();    
  }

  guardarComentario(comentario, estado){
    comentario.estado = estado;
    this.cmsService.saveComment(comentario)
      .subscribe(result => {
        comentario.estado = estado;
      },
        error => {
          console.log('error', error);
        }
      );
  } 

  ocultarComentario(comentario){
    console.log('ocultarComentario');
  }

  showModal() {
    this.recibidoParams.sectioclass = 'alert';
    this.recibidoParams.title = "Error.";
    this.recibidoParams.text = "Hubo un error al guardar el comentario, por favor intente más tarde.";
    this.recibidoParams.buttonText = "Cerrar";
    this._elementRef.nativeElement.querySelector('#open-modal-recibido').click();
  }

  modalRecibidoCloseClicked() {

  }

  cargarMapas() {
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

  goLibroDeVisitas() {
    let el = document.getElementById("libro-de-visitas");
    el.scrollIntoView();
  }

  goToFormularioVisitasGuiadas() {
    console.log('goToFormularioVisitasGuiadas');
    setTimeout(() => {
      let el = document.getElementById("formulario-visitas-guiadas");
      el.scrollIntoView();
    }, 200);
  }
}
