import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DbService } from '../../db.service';
import { TokenService } from '../middle-section/token.service';

 
@Injectable({ providedIn: 'root' })
export class GameOverService {

    private refresh = new Subject<any>();

    constructor(private dbservice: DbService, private tokenservice: TokenService) {

    }

    public triggerRefresh() {
        this.refresh.next('standard');
    }

    public reciveRefresh(): Observable<any> {
        console.log("HARD");
        return this.refresh.asObservable();
    }

    public callGameOver(score: string) {
        console.log("in game over", score);

        let token = localStorage.getItem('token');
        console.log("in game over token", token);

        if (token) {
            this.dbservice.postGameOver(token, score).subscribe(data => {
                console.log("before refresh", data);
                this.triggerRefresh();
            });
        }
        
    }

}