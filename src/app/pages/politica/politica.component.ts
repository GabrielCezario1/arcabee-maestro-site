import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-politica',
  standalone: true,
  templateUrl: './politica.component.html',
  styleUrls: ['./politica.component.css'],
  imports: [FooterComponent, HeaderComponent]
})
export class PoliticaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
