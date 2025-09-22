export class FaleConoscoRequest {
    Nome: string;
    Sobrenome: string;
    Email: string;
    Mensagem: string;

    constructor(params: FaleConoscoRequest) {
        this.Nome = params.Nome;
        this.Sobrenome = params.Sobrenome;
        this.Email = params.Email;
        this.Mensagem = params.Mensagem;
    }
}