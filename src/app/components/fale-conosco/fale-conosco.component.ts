import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../services/forms.service';
import { FALE_CONOSCO_FORM_CONFIG } from '../../formularios/fale-conosco.formulario';
import { FaleConoscoService } from '../../services/fale-conosco.service';
import { finalize } from 'rxjs';
import { FaleConoscoRequest } from '../../models/requests/fale-conosco.request';

@Component({
  selector: 'app-fale-conosco',
  standalone: true,
  templateUrl: './fale-conosco.component.html',
  styleUrls: ['./fale-conosco.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class FaleConoscoComponent implements OnInit {

  formulario!: FormGroup;
  enviando: boolean = false;
  tentouEnviar: boolean = false;

  constructor(
    private readonly formService: FormService,
    private readonly faleConoscoService: FaleConoscoService
  ) { }

  ngOnInit() {
    this.formulario = this.formService.construirFormulario(FALE_CONOSCO_FORM_CONFIG);
  }

  campoInvalido(nome: string): boolean {
    const c = this.formulario.get(nome);
    return !!c && c.invalid && (this.tentouEnviar || c.touched);
  }

  campoErro(nome: string, erro: string): boolean {
    const c = this.formulario.get(nome);
    return !!c && (this.tentouEnviar || c.touched) && c.hasError(erro);
  }

  enviarMensagem(): void {
    this.tentouEnviar = true;
    if (this.formulario.invalid || this.enviando) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.enviando = true;

    const req = new FaleConoscoRequest({
      Nome: String(this.formulario.get('nome')?.value ?? '').trim(),
      Sobrenome: String(this.formulario.get('sobrenome')?.value ?? '').trim(),
      Email: String(this.formulario.get('email')?.value ?? '').trim(),
      Mensagem: String(this.formulario.get('mensagem')?.value ?? '').trim()
    });

    this.faleConoscoService
      .enviar(req)
      .pipe(finalize(() => (this.enviando = false)))
      .subscribe({
        next: () => {
          this.formulario.reset();
          this.tentouEnviar = false;
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
      if ((erro as any).message) return String((erro as any).message);
    }
    return 'Não foi possível enviar sua mensagem. Tente novamente.';
  }

}
