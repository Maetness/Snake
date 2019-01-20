import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  public getAllUsers () {
    let alluser = this.http.get("/api/user/all")    
    return alluser;
  }
  
  public getOverallHighscores () {
    let allhighscores = this.http.get("/api/highscore/all");
    return allhighscores;
  }
  
  public getUserHighscores (token: string) {
    let usersocres = this.http.get("/api/highscore/user/" + token)
    return usersocres;
  }

  public postUserCreation (username: string, password: string): any{
    return this.http.post("/api/user/create", {username: username, password: password});
  }

  public postUserLogin (username: string, password: string): any{
    return this.http.post("/api/user/login", {username: username, password: password});
  }

  public postGameOver(token: string, highscore: string) {
    return this.http.post("/api/highscore/set", {token: token, highscore: highscore});
  }

  //Top-User get services // ranking
  public getTopUsers (){
    let topusers = this.http.get("/api/user/best")
    return topusers;  
  }

  public getUserInfo (token: string){
    let userinfo = this.http.get("/api/user/info/" + token)
    return userinfo;
  }

 
}
