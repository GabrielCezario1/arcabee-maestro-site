import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormService } from '../../services/forms.service';
import { REDEFINIR_SENHA_FORM_CONFIG } from '../../formularios/redefinir-senha.formulario';
import { RedefinirSenhaService } from '../../services/redefinir-senha.service';
import { RedefinirSenhaRequest } from '../../models/requests/redefinir-senha.request';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-redefinir-senha',
  standalone: true,
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class RedefinirSenhaComponent implements OnInit {

  formulario!: FormGroup;
  enviando = false;
  tentouEnviar = false;
  emailEnviado = false;

  constructor(
    private readonly formService: FormService,
    private readonly redefinirSenhaService: RedefinirSenhaService
  ) { }

  ngOnInit(): void {
    this.formulario = this.formService.construirFormulario(REDEFINIR_SENHA_FORM_CONFIG);
  }

  campoInvalido(nome: string): boolean {
    const c = this.formulario.get(nome);
    return !!c && c.invalid && (this.tentouEnviar || c.touched);
  }

  campoErro(nome: string, erro: string): boolean {
    const c = this.formulario.get(nome);
    return !!c && (this.tentouEnviar || c.touched) && c.hasError(erro);
  }

  enviarInstrucoes(): void {
    this.tentouEnviar = true;
    if (this.formulario.invalid || this.enviando) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.enviando = true;

    const req = new RedefinirSenhaRequest({
      Email: String(this.formulario.get('email')?.value ?? '').trim()
    });

    this.redefinirSenhaService
      .enviarInstrucoes(req)
      .pipe(finalize(() => (this.enviando = false)))
      .subscribe({
        next: () => {
          this.emailEnviado = true;
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
    return 'Não foi possível enviar as instruções. Tente novamente.';
  }

}
