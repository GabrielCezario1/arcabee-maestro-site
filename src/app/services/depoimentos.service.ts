import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IDepoimento } from '../models/depoimentos.model';

@Injectable({ providedIn: 'root' })
export class DepoimentosService {

    private readonly http = inject(HttpClient);
    private readonly urlBase = environment.apiBaseUrl + "/depoimentos";

    recuperarDepoimentos(): Observable<IDepoimento[]> { 
        return this.http.get<IDepoimento[]>(this.urlBase);
    }
}