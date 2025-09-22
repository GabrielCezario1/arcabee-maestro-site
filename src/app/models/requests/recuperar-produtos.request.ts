import { PaginacaoRequest } from "../paginacao/paginacao.request";

export class RecuperarProdutosRequest extends PaginacaoRequest {
    Marca?: string | null;
    Linha?: string | null;
    Tipo?: string | null;
    Busca?: string | null;

    constructor(params: Partial<RecuperarProdutosRequest> = {}) {
        super(params);
        this.Marca = params.Marca ?? null;
        this.Linha = params.Linha ?? null;
        this.Tipo = params.Tipo ?? null;
        this.Busca = params.Busca ?? null;
    }
}