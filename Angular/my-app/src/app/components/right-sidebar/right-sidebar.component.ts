import { Component, OnInit } from '@angular/core';
import { DbService } from '../../db.service';
import { TokenService } from '../middle-section/token.service';
import { GameOverService } from '../game/gameover.service'

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css']
})
export class RightSidebarComponent implements OnInit {
  
  public currentuser: string = "tester";
  public userinfo: any;
  public userhighscore: any;

  constructor(private dbservice : DbService, private tokenService: TokenService, private gameoverservice: GameOverService) { }

  ngOnInit() {
    this.tokenService.getToken().subscribe(data => {
      this.dbservice.getUserHighscores(data).subscribe(data =>{
        console.log("userhigh", data); 
        this.userhighscore = data;
      })
      this.dbservice.getUserInfo(data).subscribe(data =>{
        console.log("userinfo", data); 
        this.userinfo = data;
      })
    })
    this.gameoverservice.reciveRefresh().subscribe(data => {
      console.log("HARD2");

      let token = localStorage.getItem('token');
      if (token) {
        this.dbservice.getUserHighscores(token).subscribe(data =>{
          console.log("userhigh", data); 
          this.userhighscore = data;
        })
        this.dbservice.getUserInfo(token).subscribe(data =>{
          console.log("userinfo", data); 
          this.userinfo = data;
        })
      }
    });
  }

}
