export interface IUsuarioLogado {
    login: string;
    nome: string;
    sobrenome: string;
    email: string;
    plano: {
        id: number;
        nome: string;
        vencimento: Date;
    };
    fotoPerfil: string;
}