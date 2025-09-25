import { PaginacaoRequest } from "../paginacao/paginacao.request";

export class RecuperarProdutosRequest extends PaginacaoRequest {
    Marca?: string | null;
    Linha?: string | null;
    Tipo?: string | null;
    Nome?: string | null;

    constructor(params: Partial<RecuperarProdutosRequest> = {}) {
        super(params);
        this.Marca = params.Marca ?? "";
        this.Linha = params.Linha ?? "";
        this.Tipo = params.Tipo ?? "";
        this.Nome = params.Nome ?? "";
    }
}