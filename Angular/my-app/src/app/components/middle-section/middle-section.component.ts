import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { DbService } from '../../db.service'

@Component({
  selector: 'app-middle-section',
  templateUrl: './middle-section.component.html',
  styleUrls: ['./middle-section.component.css']
})

export class MiddleSectionComponent implements OnInit {

  constructor(private dbservice : DbService) { }
  sendtype: "login" | "register";

  ngOnInit() {
  }
public onSubmit(form: NgForm){
  console.log("form", form.value);
  console.log("login", this.sendtype);

  if (form.valid) {
    if (this.sendtype==="login") {
      this.dbservice.postUserLogin(form.value.uname, form.value.psw).subscribe(data =>{
        // this. = data;
         console.log("data6", data); 
           
       })
    } else if(this.sendtype==="register") {
  
      this.dbservice.postUserCreation(form.value.uname, form.value.psw).subscribe(data =>{
        // this. = data;
         console.log("data5", data); 
  
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

