import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IDepoimento } from '../models/depoimentos.model';

@Injectable({ providedIn: 'root' })
export class DepoimentosService {

    private readonly http = inject(HttpClient);
    private readonly urlBase = environment.apiBaseUrl;

    recuperarDepoimentos(): Observable<IDepoimento[]> {
        const url = `${this.urlBase}/depoimentos`;
        return this.http.get<IDepoimento[]>(url);
    }
}