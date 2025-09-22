import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { validarSenhasIguais } from '../../utils/funcoes-utilitarias.utils';
import { NOVA_SENHA_FORM_CONFIG } from '../../formularios/nova-senha.formulario';
import { FormService } from '../../services/forms.service';
import { NovaSenhaService } from '../../services/nova-senha.service';
import { NovaSenhaRequest } from '../../models/requests/nova-senha.request';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-nova-senha',
  standalone: true,
  templateUrl: './nova-senha.component.html',
  styleUrls: ['./nova-senha.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class NovaSenhaComponent implements OnInit {

  formulario!: FormGroup;
  enviando = false;
  tentouEnviar = false;

  constructor(
    private readonly formService: FormService,
    private readonly router: Router,
    private readonly novaSenhaService: NovaSenhaService
  ) { }

  ngOnInit(): void {
    this.formulario = this.formService.construirFormulario(NOVA_SENHA_FORM_CONFIG);
    this.formulario.setValidators(validarSenhasIguais('senha', 'confirmarSenha'));
  }

  campoInvalido(nome: string): boolean {
    const c = this.formulario.get(nome);
    return !!c && c.invalid && (this.tentouEnviar || c.touched);
  }

  campoErro(nome: string, erro: string): boolean {
    const c = this.formulario.get(nome);
    return !!c && (this.tentouEnviar || c.touched) && c.hasError(erro);
  }

  campoConfirmacaoInvalido(): boolean {
    const c = this.formulario.get('confirmarSenha');
    const invalidoPorCampo = !!c && c.invalid;
    const invalidoPorGrupo = this.formulario.hasError('senhasDiferentes');
    return (this.tentouEnviar || c?.touched) && (invalidoPorCampo || invalidoPorGrupo);
  }

  erroSenhasDiferentes(): boolean {
    const c = this.formulario.get('confirmarSenha');
    return (this.tentouEnviar || c?.touched) && this.formulario.hasError('senhasDiferentes');
  }

  salvarNovaSenha(): void {
    this.tentouEnviar = true;
    if (this.formulario.invalid || this.enviando) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.enviando = true;

    const req = new NovaSenhaRequest({
      Senha: String(this.formulario.get('senha')?.value ?? '')
    });

    this.novaSenhaService
      .salvar(req)
      .pipe(finalize(() => (this.enviando = false)))
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
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
    return 'Não foi possível alterar a senha. Tente novamente.';
  }

}
