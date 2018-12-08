import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-middle-section',
  templateUrl: './middle-section.component.html',
  styleUrls: ['./middle-section.component.css']
})
export class MiddleSectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
public onSubmit(form: NgForm){
  console.log(form.value);

}
}

