import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { RedefinirSenhaComponent } from './pages/redefinir-senha/redefinir-senha.component';
import { NovaSenhaComponent } from './pages/nova-senha/nova-senha.component';
import { TermosComponent } from './pages/termos/termos.component';
import { PoliticaComponent } from './pages/politica/politica.component';
import { AuthGuard } from './services/auth.guard';
import { AreaUsuarioComponent } from './pages/area-usuario/area-usuario.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'catalogo', component: CatalogoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'redefinir-senha', component: RedefinirSenhaComponent },
    { path: 'nova-senha', component: NovaSenhaComponent },
    { path: 'termos-de-uso', component: TermosComponent },
    { path: 'politica-privacidade', component: PoliticaComponent },
    { path: 'conta', component: AreaUsuarioComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];