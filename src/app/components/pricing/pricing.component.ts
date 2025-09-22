import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing',
  standalone: true,
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  planos = [
    {
      nome: 'Silver',
      preco: 'R$30,00/mês',
      topicos: [
        { texto: 'Acesso ilimitado aos materiais', incluso: true },
        { texto: 'Marcas Nacionais', incluso: true },
        { texto: 'Acesso a materiais beta', incluso: true },
        { texto: 'Acesso a materiais didáticos', incluso: false },
        { texto: 'Mais de 90.000 materiais disponíveis', incluso: true },
        { texto: 'Mais de 200 famílias paramétricas', incluso: false },
        { texto: 'Material Personalizado', incluso: false },
        { texto: 'Suporte Personalizado', incluso: false },
        { texto: 'Desconto de três mensalidades', incluso: false },
        { texto: 'Acesso em até 10 dispositivos simultâneos', incluso: false },
      ],
      botao: 'Contratar agora',
      gradient: 'from-[#A839F7] via-[#7D63F9] to-[#52A2F7]'
    },
    {
      nome: 'Gold',
      preco: 'R$35,00/mês',
      topicos: [
        { texto: 'Acesso ilimitado aos materiais', incluso: true },
        { texto: 'Marcas Nacionais', incluso: true },
        { texto: 'Acesso a materiais beta', incluso: true },
        { texto: 'Acesso a materiais didáticos', incluso: true },
        { texto: 'Mais de 90.000 materiais disponíveis', incluso: true },
        { texto: 'Mais de 200 famílias paramétricas', incluso: true },
        { texto: 'Material Personalizado', incluso: false },
        { texto: 'Suporte Personalizado', incluso: false },
        { texto: 'Desconto de três mensalidades', incluso: false },
        { texto: 'Acesso em até 10 dispositivos simultâneos', incluso: false },
      ],
      botao: 'Contratar agora',
      gradient: 'from-[#A839F7] via-[#7D63F9] to-[#52A2F7]'
    },
    {
      nome: 'Diamond',
      preco: 'R$40,00/mês',
      topicos: [
        { texto: 'Acesso ilimitado aos materiais', incluso: true },
        { texto: 'Marcas Nacionais', incluso: true },
        { texto: 'Acesso a materiais beta', incluso: true },
        { texto: 'Acesso a materiais didáticos', incluso: true },
        { texto: 'Mais de 90.000 materiais disponíveis', incluso: true },
        { texto: 'Mais de 200 famílias paramétricas', incluso: true },
        { texto: 'Material Personalizado', incluso: true },
        { texto: 'Suporte Personalizado', incluso: true },
        { texto: 'Desconto de três mensalidades', incluso: true },
        { texto: 'Acesso em até 10 dispositivos simultâneos', incluso: true },
      ],
      botao: 'Contratar agora',
      gradient: 'from-[#A839F7] via-[#7D63F9] to-[#52A2F7]'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
