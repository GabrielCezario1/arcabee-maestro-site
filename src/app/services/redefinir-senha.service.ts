import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { RedefinirSenhaRequest } from '../models/requests/redefinir-senha.request';

@Injectable({ providedIn: 'root' })
export class RedefinirSenhaService {

    private readonly http = inject(HttpClient);
    private readonly urlBase = environment.apiBaseUrl;
    private readonly recurso = 'redefinir-senha';

    enviarInstrucoes(dados: RedefinirSenhaRequest): Observable<unknown> {
        const url = `${this.urlBase}/${this.recurso}`;
        return this.http.post(url, dados);
    }
}