import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FaleConoscoRequest } from '../models/requests/fale-conosco.request';

@Injectable({ providedIn: 'root' })
export class FaleConoscoService {

    private readonly http = inject(HttpClient);
    private readonly urlBase = environment.apiBaseUrl + '/feedbacks';

    enviar(dados: FaleConoscoRequest): Observable<unknown> {
        return this.http.post(this.urlBase, dados);
    }
}