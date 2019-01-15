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
    this.dbservice.getOverallHighscores().subscribe(data =>{
      this.scores = data;
    })
    this.dbservice.getTopUsers().subscribe(data => {
      this.topuser = data;
    });
  }

}
