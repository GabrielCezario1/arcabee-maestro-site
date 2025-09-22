import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-termos',
  standalone: true,
  templateUrl: './termos.component.html',
  styleUrls: ['./termos.component.css'],
  imports: [FooterComponent, HeaderComponent]
})
export class TermosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
