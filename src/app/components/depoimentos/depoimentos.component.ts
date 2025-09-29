import { Component, HostListener, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { IDepoimento } from '../../models/depoimentos.model';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { DepoimentosService } from '../../services/depoimentos.service';

@Component({
  selector: 'app-depoimentos',
  standalone: true,
  templateUrl: './depoimentos.component.html',
  styleUrls: ['./depoimentos.component.css'],
  imports: [CommonModule],
  animations: [
    trigger('slide', [
      transition(':increment', [group([
        query(':enter', [
          style({ position: 'absolute', inset: 0, opacity: 0, transform: 'translateX(24px)' }),
          animate('350ms cubic-bezier(0.22,1,0.36,1)', style({ opacity: 1, transform: 'translateX(0)' })),
        ], { optional: true }),
        query(':leave', [
          style({ position: 'absolute', inset: 0 }),
          animate('350ms cubic-bezier(0.22,1,0.36,1)', style({ opacity: 0, transform: 'translateX(-24px)' })),
        ], { optional: true })
      ])]),
      transition(':decrement', [group([
        query(':enter', [
          style({ position: 'absolute', inset: 0, opacity: 0, transform: 'translateX(-24px)' }),
          animate('350ms cubic-bezier(0.22,1,0.36,1)', style({ opacity: 1, transform: 'translateX(0)' })),
        ], { optional: true }),
        query(':leave', [
          style({ position: 'absolute', inset: 0 }),
          animate('350ms cubic-bezier(0.22,1,0.36,1)', style({ opacity: 0, transform: 'translateX(24px)' })),
        ], { optional: true })
      ])])
    ])
  ]
})
export class DepoimentosComponent implements OnInit {

  @HostListener('window:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') this.voltar();
    if (e.key === 'ArrowRight') this.avancar();
  }

  depoimentoAtivo = 0;
  animacaoDesabilitada = false;
  toqueMobile: number | null = null;

  carregando = false;
  depoimentos: IDepoimento[] = [];

  constructor(
    private readonly depoimentosService: DepoimentosService,
    private readonly viewportScroller: ViewportScroller
  ) { }

  ngOnInit() {
    if (typeof window !== 'undefined' && window.matchMedia) {
      this.animacaoDesabilitada = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    this.obterDepoimentos();
  }

  private obterDepoimentos(): void {
    if (this.carregando) return;
    this.carregando = true;

    this.depoimentosService
      .recuperarDepoimentos()
      .pipe(finalize(() => (this.carregando = false)))
      .subscribe({
        next: (lista) => {
          this.depoimentos = Array.isArray(lista) ? lista : [];
          this.depoimentoAtivo = 0;
        },
        error: (erro) => {
          console.error('Erro ao recuperar depoimentos:', erro);
        }
      });
  }

  get tamanhoDepoimentos(): number {
    return this.depoimentos?.length ?? 0;
  }

  get atual(): IDepoimento | null {
    if (!this.tamanhoDepoimentos) return null;
    return this.depoimentos[this.depoimentoAtivo];
  }

  voltar(): void {
    if (!this.tamanhoDepoimentos) return;
    this.depoimentoAtivo = (this.depoimentoAtivo - 1 + this.tamanhoDepoimentos) % this.tamanhoDepoimentos;
  }

  avancar(): void {
    if (!this.tamanhoDepoimentos) return;
    this.depoimentoAtivo = (this.depoimentoAtivo + 1) % this.tamanhoDepoimentos;
  }

  onTouchStart(event: TouchEvent): void {
    this.toqueMobile = event.changedTouches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    if (this.toqueMobile === null) return;
    const delta = event.changedTouches[0].clientX - this.toqueMobile;
    const threshold = 40;
    if (delta > threshold) this.voltar();
    if (delta < -threshold) this.avancar();
    this.toqueMobile = null;
  }

  trackByIndex(i: number): number {
    return i;
  }

  irParaPricing(event?: Event): void {
    event?.preventDefault();
    this.viewportScroller.scrollToAnchor('pricing');
  }
}