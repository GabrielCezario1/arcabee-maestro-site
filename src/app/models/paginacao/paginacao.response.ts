export class PaginacaoResponse<T> {
    total?: number;
    registros?: Array<T>;

    constructor(params: Partial<PaginacaoResponse<T>> = {}) {
        this.total = params.total ?? 0;
        this.registros = params.registros ?? [];
    }
}