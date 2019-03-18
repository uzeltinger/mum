import { ViewChild, Component, OnInit, Input, ElementRef, EventEmitter, Output } from '@angular/core';
import { Constancia } from 'src/app/models/constancia';

@Component({
  selector: 'app-constancia',
  templateUrl: './constancia.component.html',
  styleUrls: ['./constancia.component.css']
})
export class ConstanciaComponent implements OnInit {
  now: string = "";
  @Input() constanciaParams = new Constancia;
  @Output() constanciaClosed = new EventEmitter<string>();
  constructor(private _elementRef: ElementRef) {
    this.constanciaParams.titulo = 'fabio';
   }

  ngOnInit() {
    console.log('constanciaParams',this.constanciaParams);
    var event = new Date();
    console.log('toLocaleTimeString',event.toLocaleTimeString('es-AR'));
    var options = {year: 'numeric', month: 'numeric', day: 'numeric' };
    console.log(event.toLocaleDateString('es-AR', options));
    this.now = event.toLocaleDateString('es-AR', options) + " " + event.toLocaleTimeString('es-AR');
  }

  constanciaClosedClicked() {
    this.constanciaClosed.emit('constanciaClosed');
  }
  
  ngOnDestroy(){
    console.log('ngOnDestroy');
    this._elementRef.nativeElement.querySelector('#close-modal').click();
    //this.closeBtn.nativeElement.click();
  }

  printConstancia(){
    //imprimir-constancia
    console.log('printConstancia');
    let printContainer: HTMLElement = document.querySelector('#imprimir-constancia');  
    let popupWinindow;
        let innerContents = printContainer.innerHTML;
        popupWinindow = window.open('', '_blank', 'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="/media/css/print.css" /></head><body class="imprimir-constancia" onload="window.print()">' + innerContents + '</body></html>');
        popupWinindow.document.close();    
  }  
}
