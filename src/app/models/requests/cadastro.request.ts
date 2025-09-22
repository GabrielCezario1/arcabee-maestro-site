export class CadastroRequest {
    Nome: string;
    Sobrenome: string;
    Usuario: string;
    Email: string;
    Senha: string;

    constructor(params: CadastroRequest) {
        this.Nome = params.Nome;
        this.Sobrenome = params.Sobrenome;
        this.Usuario = params.Usuario;
        this.Email = params.Email;
        this.Senha = params.Senha;
    }
}