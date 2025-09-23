import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ICatalogoSliderItem } from '../../models/catalogo-slider.model';
import { CatalogoSliderService } from '../../services/catalogo-slider.service';

@Component({
  selector: 'app-catalogo-slider-preview',
  standalone: true,
  templateUrl: './catalogo-slider-preview.component.html',
  styleUrls: ['./catalogo-slider-preview.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogoSliderPreviewComponent implements OnInit {
  itens: ICatalogoSliderItem[] = [
    { url: '/assets/produtos/almofada-no.png', alt: 'Almofada nó' },
    { url: '/assets/produtos/bancada.png', alt: 'Bancada' },
    { url: '/assets/produtos/biombo-palha.png', alt: 'Biombo de palha' },
    { url: '/assets/produtos/cobogo.png', alt: 'Cobogó' },
    { url: '/assets/produtos/movel-fechado.png', alt: 'Móvel fechado' },
    { url: '/assets/produtos/movel-aberto.png', alt: 'Móvel aberto' },
    { url: '/assets/produtos/busto-expositor.png', alt: 'Busto expositor' },
  ];
  carregando = false;

  constructor(private readonly catalogoSliderService: CatalogoSliderService) { }

  ngOnInit() {
   // this.carregarPreview();
  }

  private carregarPreview(): void {
    if (this.carregando) return;
    this.carregando = true;
    this.catalogoSliderService.recuperarPreview().subscribe({
      next: (res) => {
        this.itens = Array.isArray(res) ? res : [];
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar preview do catálogo:', err);
        this.itens = [];
        this.carregando = false;
      }
    });
  }
}