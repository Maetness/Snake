import { Component, OnInit } from '@angular/core';
import { DbService } from '../../db.service'
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {
public highscores: string[] = ["Erster", "Zweiter", "Dritter"];
public scores: any;
  constructor(private dbservice : DbService) { }

  ngOnInit() {
    this.dbservice.getOverallHighscores().subscribe(data =>{
      this.scores = data;
      console.log("data2", data);
      for(let element in data){
        console.log("elements:", data[element]);
      }
    })
  }

}
