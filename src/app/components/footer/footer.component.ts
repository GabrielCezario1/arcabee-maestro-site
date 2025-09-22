import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../services/forms.service';
import { INSIGHTS_FORM_CONFIG } from '../../formularios/insights.formulario';
import { CommonModule } from '@angular/common';
import { InsightsService } from '../../services/insights.service';
import { InsightsRequest } from '../../models/requests/insights.request';
import { finalize } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterLink]
})
export class FooterComponent implements OnInit {

  formulario: FormGroup;
  enviando: boolean = false;
  private resizeObserver?: ResizeObserver;
  private onWinResize = () => this.setCssVar();

  constructor(
    private readonly formService: FormService,
    private readonly insightsService: InsightsService,
    private el: ElementRef<HTMLElement>, private zone: NgZone
  ) { }

  ngOnInit() {
    this.formulario = this.formService.construirFormulario(INSIGHTS_FORM_CONFIG);
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.setCssVar();
      this.resizeObserver = new ResizeObserver(() => this.setCssVar());
      this.resizeObserver.observe(this.el.nativeElement);
      window.addEventListener('resize', this.onWinResize, { passive: true });
    });
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    window.removeEventListener('resize', this.onWinResize);
  }

  assinar() {
    const controleEmail = this.formulario.get('email');
    if (!controleEmail) return;

    const valor = String(controleEmail.value || '').trim();
    if (!valor) {
      controleEmail.markAsTouched();
      controleEmail.setErrors({ required: true });
      return;
    }
    if (controleEmail.invalid || this.enviando) {
      controleEmail.markAsTouched();
      return;
    }

    this.enviando = true;

    const req = new InsightsRequest({ Email: valor });

    this.insightsService
      .assinar(req)
      .pipe(finalize(() => (this.enviando = false)))
      .subscribe({
        next: () => {
          this.formulario.reset();
        },
        error: (erro) => {
          const mensagem = this.obterMensagemErro(erro);
        }
      });
  }

  private obterMensagemErro(erro: any): string {
    if (erro && typeof erro === 'object') {
      if (erro.error) {
        if (typeof erro.error === 'string') return erro.error;
        if (erro.error.mensagem) return String(erro.error.mensagem);
        if (erro.error.message) return String(erro.error.message);
        if (Array.isArray(erro.error.errors) && erro.error.errors.length) return String(erro.error.errors[0]);
      }
      if (erro.message) return String(erro.message);
    }
    return 'Não foi possível realizar a inscrição. Tente novamente.';
  }

  private setCssVar() {
    const h = this.el.nativeElement.offsetHeight || 0;
    document.documentElement.style.setProperty('--footer-h', `${h}px`);
  }

}
