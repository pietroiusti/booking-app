import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnInit {
  nothing: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
}
