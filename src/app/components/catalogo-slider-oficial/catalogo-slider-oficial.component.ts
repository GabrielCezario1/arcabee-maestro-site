import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ICatalogoSliderItem } from '../../models/catalogo-slider.model';
import { CatalogoSliderService } from '../../services/catalogo-slider.service';

@Component({
  selector: 'app-catalogo-slider-oficial',
  standalone: true,
  templateUrl: './catalogo-slider-oficial.component.html',
  styleUrls: ['./catalogo-slider-oficial.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogoSliderOficialComponent implements OnInit {

  itens: ICatalogoSliderItem[] = [
    { url: '/assets/produtos/lenco-azul.png', alt: 'Lenço azul' },
    { url: '/assets/produtos/espelho.png', alt: 'Espelho' },
    { url: '/assets/produtos/duratex.png', alt: 'Duratex' },
    { url: '/assets/produtos/poltrona-perola.png', alt: 'Poltrona pérola' },
    { url: '/assets/produtos/suvinil.png', alt: 'Suvinil' },
    { url: '/assets/produtos/mesa-centro.png', alt: 'Mesa de centro' },
    { url: '/assets/produtos/marmore.png', alt: 'Mármore' },
    { url: '/assets/produtos/busto-expositor.png', alt: 'Busto expositor' },
  ];

  carregando = false;

  constructor(private readonly catalogoSliderService: CatalogoSliderService) { }

  ngOnInit() {
    //this.carregarOficial();
  }

  private carregarOficial(): void {
    if (this.carregando) return;
    this.carregando = true;
    this.catalogoSliderService.recuperarOficial().subscribe({
      next: (res) => {
        this.itens = Array.isArray(res) ? res : [];
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar oficial do catálogo:', err);
        this.itens = [];
        this.carregando = false;
      }
    });
  }

}
