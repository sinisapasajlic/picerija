import { Component, Input, OnInit } from '@angular/core';
import { ProizvodService } from '../services/proizvod.service';
import Pica from 'src/models/Pica';

@Component({
  selector: 'app-pice',
  templateUrl: './pice.component.html',
  styleUrls: ['./pice.component.css'],
})
export class PiceComponent implements OnInit {
  @Input() deviceXs: boolean;
  pice: Pica[] = [];
  constructor(private _proizvodiService: ProizvodService) {}

  ngOnInit(): void {
    this._proizvodiService
      .GetProizvodi()
      .subscribe((data) => (this.pice = data));
  }
}
