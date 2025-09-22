import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { CatalogoSliderPreviewComponent } from '../../components/catalogo-slider-preview/catalogo-slider-preview.component';
import { EstatisticasHomeComponent } from '../../components/estatisticas-home/estatisticas-home.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PricingComponent } from '../../components/pricing/pricing.component';
import { FaleConoscoComponent } from '../../components/fale-conosco/fale-conosco.component';
import { DuvidasFrequentesComponent } from '../../components/duvidas-frequentes/duvidas-frequentes.component';
import { DepoimentosComponent } from '../../components/depoimentos/depoimentos.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    HeaderComponent,
    CabecalhoComponent,
    CatalogoSliderPreviewComponent,
    EstatisticasHomeComponent,
    FooterComponent,
    PricingComponent,
    FaleConoscoComponent,
    DuvidasFrequentesComponent,
    DepoimentosComponent
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
