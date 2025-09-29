import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    private readonly tokenService = inject(TokenService);

    canActivate(): Observable<boolean | UrlTree> {
        return this.authService.usuarioLogado$
            .pipe(
                map(usuario => {
                    const tokenValido = this.tokenService.isTokenValido();
               
                    if (usuario && tokenValido) return true;
                    return this.router.createUrlTree(['/login']);
                })
            );
    }

}