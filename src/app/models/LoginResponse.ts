export interface LoginResponse {
  token: string;
  expiraEm: string; 
  usuario: {
    id: number;
    usuarioDescricao: string;
    login: string;
    email: string;
    perfil: string;
  };
}