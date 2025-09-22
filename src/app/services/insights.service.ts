import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { InsightsRequest } from '../models/requests/insights.request';

@Injectable({ providedIn: 'root' })
export class InsightsService {

    private readonly http = inject(HttpClient);
    private readonly urlBase = environment.apiBaseUrl;
    private readonly recurso = 'insights/assinar';

    assinar(dados: InsightsRequest): Observable<unknown> {
        const url = `${this.urlBase}/${this.recurso}`;
        return this.http.post(url, dados);
    }
}