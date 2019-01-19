import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DbService } from '../../db.service';
import { TokenService } from './token.service';


@Component({
  selector: 'app-middle-section',
  templateUrl: './middle-section.component.html',
  styleUrls: ['./middle-section.component.css']
})

export class MiddleSectionComponent implements OnInit {

  constructor(private dbservice : DbService, private tokenservice: TokenService) { }
  sendtype: "login" | "register";

  ngOnInit() {
  }

  public onSubmit(form: NgForm){
    if (form.valid) {
      if (this.sendtype==="login") {
        this.dbservice.postUserLogin(form.value.uname, form.value.psw).subscribe(data => {
           console.log("login", data.token); 
           this.tokenservice.setToken(data.token);
         })
      } else if(this.sendtype==="register") {
    
        this.dbservice.postUserCreation(form.value.uname, form.value.psw).subscribe(data => {
          // this. = data;
           console.log("creation", data); 
    
        })}  
    }
  }

  public setLogin(){
    this.sendtype = "login";

  }

  public setRegister(){
    this.sendtype = "register";
  }
  
}

