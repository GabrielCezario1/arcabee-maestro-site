import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-loading',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div *ngIf="visivel" class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="flex flex-col items-center gap-3">
        <div class="h-12 w-12 rounded-full bg-gradient-to-br from-[#A839F7] via-[#7D63F9] to-[#52A2F7] animate-pulse"></div>
        <span class="text-sm font-semibold font-glacial text-white">Carregando...</span>
      </div>
    </div>
  `
})
export class LoadingComponent {
    @Input() visivel = false;
}