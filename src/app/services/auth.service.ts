import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/requests/login.request';
import { IUsuarioLogado } from '../models/usuario-logado.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private readonly http = inject(HttpClient);
    private readonly urlBase = environment.apiBaseUrl;
    private readonly recurso = 'login';
    private usuarioSubject: BehaviorSubject<IUsuarioLogado | null>;
    public usuarioLogado$: Observable<IUsuarioLogado>;

    constructor() {
        const usuario = sessionStorage.getItem('usuarioLogado');
        this.usuarioSubject = new BehaviorSubject<IUsuarioLogado | null>(
            usuario ? JSON.parse(usuario) : null
        );
        this.usuarioLogado$ = this.usuarioSubject.asObservable();
    }

    entrar(dados: LoginRequest): Observable<IUsuarioLogado> {
        const url = `${this.urlBase}/${this.recurso}`;
        return this.http.post<IUsuarioLogado>(url, dados).pipe(
            tap(usuario => {
                this.usuarioSubject.next(usuario);
                sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            })
        );
    }

    sair() {
        this.usuarioSubject.next(null);
        sessionStorage.removeItem('usuarioLogado');
    }

    estaLogado(): boolean {
        return !!this.usuarioSubject.value;
    }
}