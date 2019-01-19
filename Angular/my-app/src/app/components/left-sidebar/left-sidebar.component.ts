import { Component, OnInit } from '@angular/core';
import { DbService } from '../../db.service'
import { GameOverService } from '../game/gameover.service'


@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})

export class LeftSidebarComponent implements OnInit {

  public scores: any;
  public topuser: any;
  constructor(private dbservice : DbService, private gameoverservice: GameOverService) { }

  ngOnInit() {
    this.dbservice.getOverallHighscores().subscribe(data =>{
      this.scores = data;
    })
    this.dbservice.getTopUsers().subscribe(data => {
      this.topuser = data;
    });
    this.gameoverservice.reciveRefresh().subscribe(data => {
      console.log("HARD3");
      this.dbservice.getOverallHighscores().subscribe(data =>{
        this.scores = data;
      })
      this.dbservice.getTopUsers().subscribe(data => {
        this.topuser = data;
      });
    });

  }

  public refreshHighscores() {

  }

}
