import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  constructor(private readonly viewportScroller: ViewportScroller) { }

  ngOnInit() {
  }

  irParaPricing(): void {
    this.viewportScroller.scrollToAnchor('pricing');
  }

}
