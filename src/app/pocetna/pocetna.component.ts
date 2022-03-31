import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css'],
})
export class PocetnaComponent implements OnInit, OnDestroy {
  // @Input() deviceXs: boolean;
  subscribe: Subscription;
  deviceXs: boolean;
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
