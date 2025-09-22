export class PaginacaoRequest {
    Pg?: number;
    Qt?: number;
    TpOrd?: string;
    CpOrd?: string;

    constructor(params: Partial<PaginacaoRequest> = {}) {
        this.Pg = params.Pg ?? 1;
        this.Qt = params.Qt ?? 12;
        this.TpOrd = params.TpOrd ?? 'ASC';
        this.CpOrd = params.CpOrd ?? 'nome';
    }
}