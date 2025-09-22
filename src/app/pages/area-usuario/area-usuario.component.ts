import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { IUsuarioLogado } from '../../models/usuario-logado.model';
import { DownloadTabComponent } from '../../components/download-tab/download-tab.component';
import { MinhaContaTabComponent } from '../../components/minha-conta-tab/minha-conta-tab.component';
import { MinhaAssinaturaTabComponent } from '../../components/minha-assinatura-tab/minha-assinatura-tab.component';
import { MinhaCarteiraTabComponent } from '../../components/minha-carteira-tab/minha-carteira-tab.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

type Aba = 'download' | 'conta' | 'assinatura' | 'carteira';

@Component({
  selector: 'app-area-usuario',
  standalone: true,
  imports: [
    CommonModule,
    DownloadTabComponent,
    MinhaContaTabComponent,
    MinhaAssinaturaTabComponent,
    MinhaCarteiraTabComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './area-usuario.component.html',
  styleUrls: ['./area-usuario.component.css'],
})
export class AreaUsuarioComponent {
  private readonly auth = inject(AuthService);

  usuario$: Observable<IUsuarioLogado | null> = this.auth.usuarioLogado$;
  abaAtiva: Aba = 'download';
  abasDesabilitadas: Record<Aba, boolean> = {
    download: false,
    conta: true,
    assinatura: true,
    carteira: true,
  };

  nomeCompleto(u?: IUsuarioLogado | null): string {
    if (!u) return '';
    return `${u.nome ?? ''} ${u.sobrenome ?? ''}`.trim();
  }

  obterIniciais(u?: IUsuarioLogado | null): string {
    if (!u) return '';
    const nome = this.nomeCompleto(u);
    const partes = nome.split(/\s+/).filter(Boolean);
    const a = partes[0]?.[0] ?? '';
    const b = partes.length > 1 ? partes[partes.length - 1][0] : '';
    return (a + b).toUpperCase();
  }

  formatarDataBR(valor?: string | Date): string {
    if (!valor) return '';
    const d = new Date(valor);
    if (isNaN(d.getTime())) return '';
    return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(d);
  }

  setAba(aba: Aba) {
    if (this.abasDesabilitadas[aba]) return;
    this.abaAtiva = aba;
  }

  estaAtiva(aba: Aba) {
    return this.abaAtiva === aba;
  }
}