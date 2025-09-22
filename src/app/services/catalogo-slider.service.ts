import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ICatalogoSliderItem } from '../models/catalogo-slider.model';

@Injectable({ providedIn: 'root' })
export class CatalogoSliderService {

    private readonly http = inject(HttpClient);
    private readonly baseUrl = environment.apiBaseUrl;

    recuperarPreview(): Observable<ICatalogoSliderItem[]> {
        return this.http.get<ICatalogoSliderItem[]>(`${this.baseUrl}/catalogo-slider/preview`);
    }

    recuperarOficial(): Observable<ICatalogoSliderItem[]> {
        return this.http.get<ICatalogoSliderItem[]>(`${this.baseUrl}/catalogo-slider/oficial`);
    }
}