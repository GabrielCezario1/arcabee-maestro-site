import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-duvidas-frequentes',
  standalone: true,
  templateUrl: './duvidas-frequentes.component.html',
  styleUrls: ['./duvidas-frequentes.component.css']
})
export class DuvidasFrequentesComponent implements OnInit {

  topicos = [
    'Como instalar o plugin no Revit?',
    'Quais são os requisitos de sistema necessários para executar o plugin?',
    'Como acessar a biblioteca BIM dentro do Revit após a instalação?',
    'Posso personalizar a biblioteca BIM de acordo com as necessidades do meu projeto?',
    'O plugin oferece suporte a múltiplos idiomas?',
    'Como atualizar o plugin para a versão mais recente?',
    'Quais são os tipos de elementos disponíveis na biblioteca BIM?',
    'O plugin oferece modelos paramétricos ou famílias pré-configuradas?',
    'Como posso importar elementos da biblioteca BIM para o meu projeto no Revit?'
  ];

  topicoExpandido: number | null = null;

  constructor() { }

  ngOnInit() {
  }

  expandir(index: number) {
    this.topicoExpandido = this.topicoExpandido === index ? null : index;
  }

}
