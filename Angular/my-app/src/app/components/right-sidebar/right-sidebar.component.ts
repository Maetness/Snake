import { Component, OnInit } from '@angular/core';
import { DbService } from '../../db.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css']
})
export class RightSidebarComponent implements OnInit {
  
  public currentuser: string = "test";
  public user_info: any;
  public user_highscore: any;

  constructor(private dbservice : DbService) { }

  ngOnInit() {
    this.dbservice.getUserHighscores(this.currentuser).subscribe(data =>{
      console.log("userinfo", data); 
      this.user_highscore = data;
    })
    this.dbservice.getUserInfo(this.currentuser).subscribe(data =>{
      console.log("userhigh", data); 
      this.user_info = data;
    })

  }

}
