import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import * as screenfull from 'screenfull';
import { Game } from './game'
import { GameOverService } from './gameover.service';

declare var game:any;

@Component({
 selector: 'app-game',
 templateUrl: './game.component.html',
 styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {

    @ViewChild('gamebox') gamebox: ElementRef;   
    mygame: any;
    public currentuser: string = "tester";

    public Clickme(){
        if (screenfull.enabled) {
            screenfull.request(this.gamebox.nativeElement);
        }
    }

   constructor(private gameoverservice: GameOverService) { }
   ngOnInit() {
        console.log("CANVAS", this.gamebox);
        this.mygame = new Game(this.gamebox, this.gameoverservice);
   }

   @HostListener('window:keydown', ['$event'])
   onKeydownHandler(event) {
       console.log("handler", event);
        this.mygame.onKeydownHandler(event);
   }

}



