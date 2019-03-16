import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { } from '@types/googlemaps';
import { LoginService } from 'src/app/services/login/login.service';
import { CmsService } from 'src/app/services/cms/cms.service';
import { ServicioService } from 'src/app/services/servicio/servicio.service';

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
  modalParams = { 'title': '', 'text': '', 'buttonText': '', 'buttonAction': '' };
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
  solicitudFormEnviada: boolean = false;
  ponderables: any;
  ponderablesById: any = [];
  totalPonderables: number;

  constructor(private route: ActivatedRoute,
    private loginService: LoginService,
    private cmsService: CmsService,
    private servicio: ServicioService,
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
    this.getPonderables();
    this.getComments();
  }

  getComments() {
    this.cmsService.getComments()
      .subscribe(result => {
        let comentarios: any = result;
        if (!this.userLogued) {
          comentarios.forEach(element => {
            if (element.estado == 0) {
              element.estado = 9;
            }
          });
          this.comentarios = comentarios;
        } else {
          this.comentarios = result;
        }
      },
        error => {
          console.log('error', error);
        }
      );
  }

  setEstrellas(tipo: number, cantidad: number) {
    console.log('tipo', tipo);
    console.log('cantidad', cantidad);
    this.estrellasSeleccionadas[tipo] = cantidad;
  }

  onSubmitSolicitud(formulario) {
    let data = formulario.form.value;

    var date_ = data.solicFechaVisita.split(/\-/);
    let fecha = date_[2] + '-' + date_[1] + '-' + date_[0];
    data.solicFechaVisita = fecha;

    this.servicio.sendSolicitud(data)
      .subscribe(result => {
        console.log('sendSolicitud result', result);
        this.recibidoParams.sectioclass = '';
        this.recibidoParams.title = "Solicitud enviada.";
        this.recibidoParams.text = "Su solicitud de visita ha sido enviada con éxito.";
        this.recibidoParams.buttonText = "Cerrar";
        this._elementRef.nativeElement.querySelector('#open-modal-recibido').click();
        this.solicitudFormEnviada = true;
      },
        error => {
          console.log('error', error);

          this.recibidoParams.sectioclass = 'alert';
          this.recibidoParams.title = "Error.";
          this.recibidoParams.text = "Hubo un error al enviar la solicitud, por favor intente más tarde.";
          this.recibidoParams.buttonText = "Cerrar";
          this._elementRef.nativeElement.querySelector('#open-modal-recibido').click();

        }
      );
    console.log("data", data);
  }

  getPonderables() {
    this.servicio.getPonderables()
      .subscribe(result => {
        this.ponderables = result;
        this.ponderablesById = [];
        this.ponderables.forEach(element => {
          this.estrellasSeleccionadas[element.id] = 0;
          this.ponderablesById[element.id] = element;
          this.totalPonderables = this.ponderables.length;
        });
        console.log('this.ponderables', this.ponderables);    
        console.log('this.ponderablesById', this.ponderablesById);    
        console.log('this.totalPonderables', this.totalPonderables);     
      },
        error => {
          console.log('error', error);
        }
      );
  };

  onSubmitComentario(formulario) {
    // this.showSpinner = true; itemPonderableNumero
    let data = formulario.form.value;
    let itemPonderableNumero: string = "";
    let cantPonderada: string = "";
    let validar: string = "";
    let errorDeDatos: boolean = false;
    let next: number = 0;

    this.ponderables.forEach(element => {
      itemPonderableNumero = itemPonderableNumero + "\"" + element.id + "\"";     
      cantPonderada = cantPonderada + "\"" + this.estrellasSeleccionadas[element.id];
      next++;
      if(next<this.ponderables.length){
        itemPonderableNumero = itemPonderableNumero + ",";
        cantPonderada = cantPonderada + ",";
      }
      if(this.estrellasSeleccionadas[element.id]==0){
      validar = validar + "<br>Debe valorar todos los items";
      errorDeDatos = true;
      }
    });

    if (data.comentNombre == "") {
      validar = validar + "<br>Debe ingresar el nombre";
      errorDeDatos = true;
    }
    if (data.comentDescripcion == "") {
      validar = validar + "<br>Debe ingresar el comentario";
      errorDeDatos = true;
    }

    if (errorDeDatos) {
      this.recibidoParams.sectioclass = "alert";
      this.recibidoParams.title = "Campos inválidos.";
      this.recibidoParams.text = "Por favor verifique todos los campos ingresados.<br>" + validar;
      this.recibidoParams.buttonText = "Listo";
      this._elementRef.nativeElement.querySelector('#open-modal-recibido').click();
    } else {
      data.itemPonderableNumero = itemPonderableNumero;
      data.cantPonderada = cantPonderada;
      console.log('data', data);
      this.showSpinner = true;

      this.servicio.sendComentario(data)
        .subscribe(result => {
          console.log('sendComentario result', result);
          this.showSpinner = false;
          this.recibidoParams.sectioclass = '';
          this.recibidoParams.title = "Exito.";
          this.recibidoParams.text = "Gracias por enviar su comentario";
          this.recibidoParams.buttonText = "Cerrar";
          this._elementRef.nativeElement.querySelector('#open-modal-recibido').click();
          this.solicitudFormEnviada = true;
        },
          error => {
            console.log('error', error);
            this.showSpinner = false;
            this.recibidoParams.sectioclass = 'alert';
            this.recibidoParams.title = "Error.";
            this.recibidoParams.text = "Hubo un error al enviar la solicitud, por favor intente más tarde.";
            this.recibidoParams.buttonText = "Cerrar";
            this._elementRef.nativeElement.querySelector('#open-modal-recibido').click();
          }
        );
      /*
      setTimeout(() => {
        this.showSpinner = false;
        this.recibidoParams.sectioclass = '';
        this.recibidoParams.title = "Exito.";
        this.recibidoParams.text = "Gracias por enviar su comentario";
        this.recibidoParams.buttonText = "Cerrar";
        this._elementRef.nativeElement.querySelector('#open-modal-recibido').click();
      }, 1000);
      */
    }
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

  borrarComentario(comentario) {
    console.log('borrarComentario');
    this.borrarComentarioObject = comentario;
    this.modalParams.title = "Cuidado.";
    this.modalParams.text = "Está seguro que desea eliminar el comentario?";
    this.modalParams.buttonText = "Borrar";
    this.modalParams.buttonAction = "actionConfirmedClicked";
    this._elementRef.nativeElement.querySelector('#open-modal-confirm').click();
  }

  guardarComentario(comentario, estado) {
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

  ocultarComentario(comentario) {
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
