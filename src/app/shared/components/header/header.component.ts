import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  titulo = 'Metamodelo para vinculación de recursos educativos abiertos mediante especificaciones LOD y basado en principios de confianza';
  
  constructor() { }

  ngOnInit(): void {
  }

}
