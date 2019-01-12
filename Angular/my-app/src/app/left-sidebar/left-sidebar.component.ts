import { Component, OnInit } from '@angular/core';
import { DbService } from '../../db.service'

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})

export class LeftSidebarComponent implements OnInit {

  public scores: any;
  public topuser: any;
  constructor(private dbservice : DbService) { }

  ngOnInit() {
	console.log("init highscores");
    this.dbservice.getOverallHighscores().subscribe(data =>{
      this.scores = data;
      console.log("data2", data);       
    })
    this.dbservice.getTopUsers().subscribe(data => {
      console.log("data3", data);
      this.topuser = data;
    });
  }

}
