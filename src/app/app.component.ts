import { Component, OnDestroy, OnInit } from '@angular/core';
import Pica from 'src/models/Pica';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'picerija';
  constructor() {}

  ngOnInit(): void {}
}
