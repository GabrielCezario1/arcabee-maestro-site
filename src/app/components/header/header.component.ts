import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { IUsuarioLogado } from '../../models/usuario-logado.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, RouterModule]
})
export class HeaderComponent implements OnInit {

  @ViewChild('perfilBtn', { static: false }) perfilBtn?: ElementRef<HTMLElement>;
  @ViewChild('perfilMenu', { static: false }) perfilMenu?: ElementRef<HTMLElement>;

  @HostListener('document:click', ['$event'])
  onDocumentClick(ev: MouseEvent) {
    if (!this.dropdownPerfilAberto) return;
    const target = ev.target as HTMLElement;
    const dentroBtn = this.perfilBtn?.nativeElement.contains(target);
    const dentroMenu = this.perfilMenu?.nativeElement.contains(target);
    if (!dentroBtn && !dentroMenu) {
      this.dropdownPerfilAberto = false;
    }
  }

  menuMobileAberto: boolean = false;
  dropdownPerfilAberto = false;

  usuario$: Observable<IUsuarioLogado | null>;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.usuario$ = this.authService.usuarioLogado$;
  }

  ngOnInit() {
  }

  mostrarMenuMobile() {
    this.menuMobileAberto = !this.menuMobileAberto;
    if (this.menuMobileAberto) this.dropdownPerfilAberto = false;
  }

  mostrarDropdownPerfil() {
    this.dropdownPerfilAberto = !this.dropdownPerfilAberto;
    if (this.dropdownPerfilAberto) this.menuMobileAberto = false;
  }

  async irParaMinhaConta() {
    this.dropdownPerfilAberto = false;
    this.menuMobileAberto = false;
    await this.router.navigateByUrl('/conta');
  }

  async sair() {
    this.authService.sair();
    this.dropdownPerfilAberto = false;
    this.menuMobileAberto = false;
    await this.router.navigateByUrl('/home');
  }

  obterIniciais(usuario?: IUsuarioLogado | null): string {
    if (!usuario) return '';
    const nomeCompleto = (
      `${usuario.nome ?? ''} ${usuario.sobrenome ?? ''}`.trim() || (usuario as any)?.usuarioDescricao || ''
    ).trim();
    const partes = nomeCompleto.split(/\s+/).filter(Boolean);
    const a = partes[0]?.[0] ?? '';
    const b = partes.length > 1 ? partes[partes.length - 1][0] : '';
    return (a + b).toUpperCase();
  }

}
