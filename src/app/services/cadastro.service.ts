import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CadastroRequest } from '../models/requests/cadastro.request';

@Injectable({ providedIn: 'root' })
export class CadastroService {

    private readonly http = inject(HttpClient);
    private readonly urlBase = environment.apiBaseUrl + "/usuarios";

    cadastrar(dados: CadastroRequest): Observable<unknown> {
        const url = `${this.urlBase}`;
        return this.http.post(url, dados);
    }
}