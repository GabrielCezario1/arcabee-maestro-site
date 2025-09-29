import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { LoginRequest } from '../models/requests/login.request';
import { IUsuarioLogado } from '../models/usuario-logado.model';
import { TokenService } from './token.service';
import { LoginResponse } from '../models/LoginResponse';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private readonly http = inject(HttpClient);
    private readonly urlBase = environment.apiBaseUrl + "/usuarios";
    private usuarioSubject: BehaviorSubject<IUsuarioLogado | null>;
    public usuarioLogado$: Observable<IUsuarioLogado | null>;
    private readonly tokenService = inject(TokenService);

    constructor() {
        const usuario = sessionStorage.getItem('usuarioLogado');
        // Se token expirou, limpa tudo
        if (usuario && !this.tokenService.isTokenValido()) {
            sessionStorage.removeItem('usuarioLogado');
            this.tokenService.limpar();
        }
        this.usuarioSubject = new BehaviorSubject<IUsuarioLogado | null>(
            this.tokenService.isTokenValido() && usuario ? JSON.parse(usuario) : null
        );
        this.usuarioLogado$ = this.usuarioSubject.asObservable();
    }

    entrar(dados: LoginRequest): Observable<IUsuarioLogado> {
        const url = `${this.urlBase}/login`;
        const params = new HttpParams({ fromObject: { Usuario: dados.Usuario, Senha: dados.Senha } });
        return this.http.get<LoginResponse>(url, { params }).pipe(
            tap(res => {
                this.tokenService.salvar(res.token, res.expiraEm);
            }),
            map(res => this.mapearUsuario(res.usuario)),
            tap(usuario => {
                this.usuarioSubject.next(usuario);
                sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            })
        );
    }

    sair() {
        this.usuarioSubject.next(null);
        sessionStorage.removeItem('usuarioLogado');
        this.tokenService.limpar();
    }

    estaLogado(): boolean {
        return this.tokenService.isTokenValido() && !!this.usuarioSubject.value;
    }

    private mapearUsuario(u: LoginResponse['usuario']): IUsuarioLogado {
        const partes = (u.usuarioDescricao ?? '').trim().split(/\s+/).filter(Boolean);
        const nome = partes[0] ?? '';
        const sobrenome = partes.length > 1 ? partes.slice(1).join(' ') : '';
        const usuarioMapeado: IUsuarioLogado = ({
            login: u.login,
            nome,
            sobrenome,
            email: u.email,
            plano: {
                id: 0,
                nome: '',
                vencimento: new Date()
            },
            fotoPerfil: ''
        });
        return usuarioMapeado;
    }
}