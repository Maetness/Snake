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
           if (data && data.token) {
             this.tokenservice.setToken(data.token);
             alert("Login successfull");
           } else {
             alert("Try login again");
             //this.alerts.setMessage("try again",'error');
           }
         })
      } else if(this.sendtype==="register") {
    
        this.dbservice.postUserCreation(form.value.uname, form.value.psw).subscribe(data => {
           console.log("creation", data.res); 
           if (data.res === "yes") {
              alert("You are registerd, please login");
           } else if (data.res === "no") {
              alert("Try register again use diffrent data");
           }
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

