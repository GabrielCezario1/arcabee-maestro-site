import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PaginacaoResponse } from '../models/paginacao/paginacao.response';
import { RecuperarProdutosRequest } from '../models/requests/recuperar-produtos.request';
import { IProduto } from '../models/produtos.model';
import { ProdutosFiltro } from '../models/ProdutosFiltro';

@Injectable({ providedIn: 'root' })
export class ProdutosService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl + '/produtos';
  
  preencherFiltros(): Observable<ProdutosFiltro> {
    return this.http.get<ProdutosFiltro>(`${this.baseUrl}/filtros`);
  }

  pesquisar(req: RecuperarProdutosRequest): Observable<PaginacaoResponse<IProduto>> {
    return this.http.get<PaginacaoResponse<IProduto>>(this.baseUrl, {params: req as any});
  }
}