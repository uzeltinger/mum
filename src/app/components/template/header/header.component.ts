import { Component, ElementRef, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HeaderVarsService } from '../../../services/template/header-vars.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  toggleCollapse() {
    this._elementRef.nativeElement.querySelector('#navbarNav').classList.remove('show');
  }

  constructor(
    public headerVarsService: HeaderVarsService,
    private _elementRef: ElementRef) { }

  ngOnInit() {
  }

}
