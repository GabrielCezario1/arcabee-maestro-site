import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { FormService } from '../../services/forms.service';
import { LOGIN_FORM_CONFIG } from '../../formularios/login.formulario';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';
import { LoginRequest } from '../../models/requests/login.request';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class LoginComponent implements OnInit {

  formulario!: FormGroup;
  enviando = false;
  tentouEnviar = false;
  erroLogin: string | null = null;

  constructor(
    private readonly formService: FormService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.formulario = this.formService.construirFormulario(LOGIN_FORM_CONFIG);
  }

  campoInvalido(nome: string): boolean {
    const c = this.formulario.get(nome);
    if (!c) return false;
    return c.invalid && (this.tentouEnviar || c.touched);
  }

  campoErro(nome: string, erro: string): boolean {
    const c = this.formulario.get(nome);
    if (!c) return false;
    return (this.tentouEnviar || c.touched) && c.hasError(erro);
  }

  fazerLogin(): void {
    this.tentouEnviar = true;
    if (this.formulario.invalid || this.enviando) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.enviando = true;
    this.erroLogin = null;

    const req = new LoginRequest({
      Usuario: String(this.formulario.get('usuario')?.value ?? '').trim(),
      Senha: String(this.formulario.get('senha')?.value ?? '')
    });

    this.authService
      .entrar(req)
      .pipe(finalize(() => (this.enviando = false)))
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (erro) => {
          this.erroLogin = erro?.error?.mensagem ?? this.obterMensagemErro(erro);
        }
      });
  }

  private obterMensagemErro(erro: any): string {
    if (erro && typeof erro === 'object') {
      if ((erro as any).error) {
        const e = (erro as any).error;
        if (typeof e === 'string') return e;
        if (e.mensagem) return String(e.mensagem);
        if (e.message) return String(e.message);
        if (Array.isArray(e.errors) && e.errors.length) return String(e.errors[0]);
      }
      if ((erro as any).message) return String((erro as any).message);
    }
    return 'Não foi possível realizar o login. Tente novamente.';
  }
}
