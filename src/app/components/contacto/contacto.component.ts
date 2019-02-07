import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  ancla: string;
  recibidoParams = { 'title': '', 'text': '', 'buttonText': '','sectioclass':'' };

  constructor(private route: ActivatedRoute,
            private _elementRef: ElementRef) { }

  ngOnInit() {
    this.route.params.subscribe((params: ParamMap) => {
      this.ancla = params['ancla'];
      console.log('ancla', this.ancla);
      if(this.ancla=='recibido'){
        /*/contacto/recibido*/
            this.recibidoParams.title = "Consulta enviada.";
            this.recibidoParams.text = "Su consulta ha sido enviada.<br>Nos comunicaremos con ud. a la brevedad.<br>¡Muchas gracias!.";
            this.recibidoParams.buttonText = "Listo";
            this._elementRef.nativeElement.querySelector('#open-modal-recibido').click();
      }
});
  }

}
