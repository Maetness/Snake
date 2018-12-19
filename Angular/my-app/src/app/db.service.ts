import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  public getAllUsers () {
    let test2 = this.http.get("/api/user/all")    
    console.log("test", test2);
    return test2;
  }
  public getOverallHighscores () {
    let test3 = this.http.get("/api/highscore/best")
    console.log("test", test3);
    return test3;
  }
  
  public getUserHighscores (name: string) {
    let test4 = this.http.get("/api/highscore/user/" + name)
    console.log("test", test4);
    return test4;
  }

  public postUserCreation (username: string, password: string){
    let test5 = this.http.post("/api/user/create", username && password);
    return test5;
  }
}
