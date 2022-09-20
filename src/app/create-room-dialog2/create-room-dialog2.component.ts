import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-room-dialog2',
  templateUrl: './create-room-dialog2.component.html',
  styleUrls: ['./create-room-dialog2.component.css']
})
export class CreateRoomDialog2Component implements OnInit {

  fg = this.fb.group({
    name: [''],
    capacity: [null],
    display: [false],
    whiteboard: [false],
    airConditioning: [false],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  fgSubmit() {
    console.log('hello wordl!');

    console.log(this.fg.value);
  }

}
