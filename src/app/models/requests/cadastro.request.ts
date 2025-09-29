export class CadastroRequest {
    Nome: string;
    Sobrenome: string;
    Login: string;
    Email: string;
    Senha: string;

    constructor(params: CadastroRequest) {
        this.Nome = params.Nome;
        this.Sobrenome = params.Sobrenome;
        this.Login = params.Login;
        this.Email = params.Email;
        this.Senha = params.Senha;
    }
}