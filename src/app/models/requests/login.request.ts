export class LoginRequest {
    Usuario: string;
    Senha: string;

    constructor(params: LoginRequest) {
        this.Usuario = params.Usuario;
        this.Senha = params.Senha;
    }
}