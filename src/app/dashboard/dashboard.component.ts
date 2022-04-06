import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import Pica from 'src/models/Pica';
import { Subscription } from 'rxjs';
import { ProizvodService } from '../proizvod.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  log: Number = 1;
  subscribe: Subscription;
  deviceXs: boolean;
  pica: Pica;
  pice: Pica[] = [];
  verifikacija: boolean = false;
  svePorudzbine: boolean = false;
  dodajProizvod: boolean = true;

  constructor(
    private mediaObs: MediaObserver,
    private _proizvodiService: ProizvodService
  ) {}

  ngOnInit(): void {
    this.subscribe = this.mediaObs.media$.subscribe((result: MediaChange) => {
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
      console.log(result.mqAlias);
    });
    this._proizvodiService
      .GetProizvodi()
      .subscribe((data) => (this.pice = data));
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  OnButtonClick(broj: Number) {
    if (broj == 1) {
      this.verifikacija = true;
      this.dodajProizvod = false;
      this.svePorudzbine = false;
    } else if (broj == 2) {
      this.verifikacija = false;
      this.dodajProizvod = false;
      this.svePorudzbine = true;
    } else {
      this.verifikacija = false;
      this.dodajProizvod = true;
      this.svePorudzbine = false;
    }
  }
  ObrisiProizvod(id: number) {
    if (
      this._proizvodiService
        .DeleteProizvodi(id)
        .subscribe((data) => (this.pica = data))
    ) {
      this._proizvodiService
        .GetProizvodi()
        .subscribe((data) => (this.pice = data));
    }
  }
}
