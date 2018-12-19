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

  ngOnInit() {
  }
public onSubmit(form: NgForm){
  console.log(form.value);
  this.dbservice.postUserCreation("matthias", "password").subscribe(data =>{
   // this. = data;
    console.log("data5", data); 
    
  })
  

}



}

