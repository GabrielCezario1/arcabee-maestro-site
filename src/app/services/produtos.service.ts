import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PaginacaoResponse } from '../models/paginacao/paginacao.response';
import { RecuperarProdutosRequest } from '../models/requests/recuperar-produtos.request';
import { IProduto } from '../models/produtos.model';

@Injectable({ providedIn: 'root' })
export class ProdutosService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  pesquisar(req: RecuperarProdutosRequest): Observable<PaginacaoResponse<IProduto>> {
    const url = `${this.baseUrl}/produtos/pesquisar`;
    return this.http.post<PaginacaoResponse<IProduto>>(url, req);
  }
}