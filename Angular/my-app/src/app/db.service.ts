import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  public getAllUsers () {
    let test2 = this.http.get("/api/user/all")    
    return test2;
  }
  
  public getOverallHighscores () {
	console.log("initi highscores");
    let test3 = this.http.get("/api/highscore/all");
    console.log("test17", test3);
    return test3;
  }
  
  public getUserHighscores (token: string) {
    let test4 = this.http.get("/api/highscore/user/" + token)
    console.log("test4", test4);
    return test4;
  }

  public postUserCreation (username: string, password: string){
    console.log("registertest", username, password);
    console.log("nodeport", "/api/user/create");
    let test5 = this.http.post("/api/user/create", {username: username, password: password});
	console.log("some", test5);
    return test5;
  }

  public postUserLogin (username: string, password: string): any{
    let test6= this.http.post("/api/user/login", {username: username, password: password});
    return test6;
  }

  public postGameOver(token: string, highscore: string) {
    console.log("postGameOver", token, highscore);
    return this.http.post("/api/highscore/set", {token: token, highscore: highscore});
  }

  //Top-User get services // ranking
  public getTopUsers (){
    let topusers = this.http.get("/api/user/best")
    console.log("TopUsers", topusers);
    return topusers;  
  }

  public getUserInfo (token: string){
    let userinfo = this.http.get("/api/user/info/" + token)
    console.log("userinfo", userinfo);
    return userinfo;
  }

 
}
