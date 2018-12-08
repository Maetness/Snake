import { Component, OnInit } from '@angular/core';
import { DbService } from '../../db.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css']
})
export class RightSidebarComponent implements OnInit {
  public user_info: string[] = ["Player-Name", "Games played:", "Member since:"];
  public personal_highscore: any;

  constructor(private dbservice : DbService) { }

  ngOnInit() {
    this.dbservice.getUserHighscores("sepp").subscribe(data =>{
      this.personal_highscore = data;
      console.log("data2", data); 
      
    })
  }

}
