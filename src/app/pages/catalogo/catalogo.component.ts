import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CatalogoSliderOficialComponent } from '../../components/catalogo-slider-oficial/catalogo-slider-oficial.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CatalogoListagemComponent } from '../../components/catalogo-listagem/catalogo-listagem.component';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
  imports: [
    HeaderComponent,
    CatalogoSliderOficialComponent,
    CatalogoListagemComponent,
    FooterComponent
  ]
})
export class CatalogoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
