import { Component, OnInit, ElementRef } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent implements OnInit {

  sala: string;

  constructor(private route: ActivatedRoute,
    private _elementRef: ElementRef) { }

  ngOnInit() {
    this.route.params.subscribe((params: ParamMap) => {
      this.sala = params['sala'];
      console.log('sala', this.sala);      
    });
  }

}
