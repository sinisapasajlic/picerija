import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

import { Subscription } from 'rxjs';
import db from 'src/db';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  log: Number = 1;
  subscribe: Subscription;
  deviceXs: boolean;
  pice = db.pice;

  constructor(private mediaObs: MediaObserver) {}

  ngOnInit(): void {
    this.subscribe = this.mediaObs.media$.subscribe((result: MediaChange) => {
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
      console.log(result.mqAlias);
    });
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
