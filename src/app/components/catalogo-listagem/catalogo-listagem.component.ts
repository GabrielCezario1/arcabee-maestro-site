import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { IProduto } from '../../models/produtos.model';
import { RecuperarProdutosRequest } from '../../models/requests/recuperar-produtos.request';
import { PRODUTOS_FORM_CONFIG } from '../../formularios/produtos.formulario';
import { ProdutosService } from '../../services/produtos.service';

@Component({
  selector: 'app-catalogo-listagem',
  standalone: true,
  templateUrl: './catalogo-listagem.component.html',
  styleUrls: ['./catalogo-listagem.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class CatalogoListagemComponent implements OnInit, OnDestroy {
  @ViewChild('catalogTop') catalogTop?: ElementRef<HTMLElement>;

  filtroForm!: FormGroup;

  carregando = false;
  produtos: IProduto[] = [];
  total = 0;
  pageSize = 12;
  currentPage = 1;

  marcas: string[] = [];
  linhas: string[] = [];
  tipos: string[] = [];

  private destroy$ = new Subject<void>();
  private onResize = () => this.setPageSizeByWidth(window.innerWidth);

  constructor(
    private readonly fb: FormBuilder,
    private readonly produtosService: ProdutosService
  ) { }

  ngOnInit(): void {
    this.filtroForm = this.fb.group(PRODUTOS_FORM_CONFIG);

    this.PreencherFiltros();
    this.filtroForm.get('marca')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => { this.currentPage = 1; this.buscar(); });

    this.filtroForm.get('linha')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => { this.currentPage = 1; this.buscar(); });

    this.filtroForm.get('tipo')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => { this.currentPage = 1; this.buscar(); });

    this.filtroForm.get('busca')?.valueChanges
      .pipe(debounceTime(350), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => { this.currentPage = 1; this.buscar(); });

    this.setPageSizeByWidth(window.innerWidth);
    window.addEventListener('resize', this.onResize);

    this.buscar();
  }

  PreencherFiltros() {
    this.produtosService.preencherFiltros().subscribe({
      next: (resp) => {
        this.marcas = resp.marcas ?? [];
        this.linhas = resp.linhas ?? [];
        this.tipos = resp.tipos ?? [];
      }
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buscar(): void {
    if (this.carregando) return;
    this.carregando = true;

    const req = new RecuperarProdutosRequest({
      Pg: this.currentPage,
      Qt: this.pageSize,
      TpOrd: 'ASC',
      CpOrd: 'nome',
      Marca: this.filtroForm.get('marca')?.value || null,
      Linha: this.filtroForm.get('linha')?.value || null,
      Tipo: this.filtroForm.get('tipo')?.value || null,
      Nome: (this.filtroForm.get('busca')?.value || null)?.toString().trim() || null
    });

    this.produtosService.pesquisar(req).pipe(takeUntil(this.destroy$)).subscribe({
      next: (resp) => {
        this.total = resp?.total ?? 0;
        this.produtos = resp?.registros ?? [];
        const totalPages = this.totalPages();
        if (this.currentPage > totalPages) {
          this.currentPage = totalPages;
          this.buscar();
        }
      },
      error: (err) => {
        console.error('Erro ao buscar produtos', err);
        this.total = 0;
        this.produtos = [];
      },
      complete: () => (this.carregando = false)
    });
  }

  totalPages(): number {
    return Math.max(1, Math.ceil((this.total || 0) / (this.pageSize || 1)));
  }

  pageList(): (number | '...')[] {
    const total = this.totalPages();
    const current = this.currentPage;
    const maxLen = 9;

    if (total <= maxLen) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | '...')[] = [];
    const edge = 2;
    const windowSize = 3;

    const left = Math.max(1, current - windowSize);
    const right = Math.min(total, current + windowSize);

    for (let i = 1; i <= Math.min(edge, total); i++) pages.push(i);
    if (left > edge + 1) pages.push('...');

    for (let i = left; i <= right; i++) {
      if (i > edge && i < total - edge + 1) pages.push(i);
    }

    if (right < total - edge) pages.push('...');
    for (let i = Math.max(total - edge + 1, 1); i <= total; i++) pages.push(i);

    return pages.filter((v, idx, arr) => idx === 0 || v !== arr[idx - 1])
      .filter((v) => v === '...' || (typeof v === 'number' && v >= 1 && v <= total));
  }

  irPara(p: number | '...') {
    if (p === '...') return;
    const total = this.totalPages();
    const page = Math.min(Math.max(1, p), total);
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.buscar();
    }
    this.scrollTop();
  }

  paginaAnterior() { this.irPara(this.currentPage - 1); }
  proximaPagina() { this.irPara(this.currentPage + 1); }

  trackById(_: number, item: IProduto) { return item.id; }

  private setPageSizeByWidth(width: number) {
    if (width >= 1024) {
      this.pageSize = 15;
    } else if (width >= 768) {
      this.pageSize = 9;
    } else {
      this.pageSize = 8;
    }
  }

  private scrollTop(): void {
    this.catalogTop?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}