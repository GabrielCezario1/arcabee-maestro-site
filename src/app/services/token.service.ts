import { Injectable } from '@angular/core';

const TOKEN_KEY = 'accessToken';
const EXP_KEY = 'tokenExpiraEm';

@Injectable({ providedIn: 'root' })
export class TokenService {
  salvar(token: string, expiraEmISO: string): void {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(EXP_KEY, expiraEmISO);
  }

  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  getExpiraEm(): string | null {
    return sessionStorage.getItem(EXP_KEY);
  }

  isTokenValido(margemSegundos = 30): boolean {
    const token = this.getToken();
    const exp = this.getExpiraEm();
    if (!token || !exp) return false;
    const agora = Date.now();
    const expMs = Date.parse(exp);
    if (isNaN(expMs)) return false;
    return expMs - agora > margemSegundos * 1000;
  }

  limpar(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(EXP_KEY);
  }
}
