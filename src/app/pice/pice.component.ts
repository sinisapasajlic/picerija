import { Component, Input, OnInit } from '@angular/core';
import db from '../../db';

@Component({
  selector: 'app-pice',
  templateUrl: './pice.component.html',
  styleUrls: ['./pice.component.css'],
})
export class PiceComponent implements OnInit {
  @Input() deviceXs: boolean;
  pice = db.pice;

  constructor() {}

  ngOnInit(): void {}
}
