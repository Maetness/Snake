import { Component, OnInit } from '@angular/core';
import { DbService } from './db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'snake-game';

  constructor (private dbservice : DbService) {  
  }
  
  ngOnInit(){
    localStorage.removeItem('token');
  };
}
