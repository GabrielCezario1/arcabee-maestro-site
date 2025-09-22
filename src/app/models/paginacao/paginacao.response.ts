export class PaginacaoResponse<T> {
    Total?: number;
    Registros?: Array<T>;

    constructor(params: Partial<PaginacaoResponse<T>> = {}) {
        this.Total = params.Total ?? 0;
        this.Registros = params.Registros ?? [];
    }
}