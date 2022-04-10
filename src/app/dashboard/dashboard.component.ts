import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import Pica from 'src/models/Pica';
import { Subscription } from 'rxjs';
import { ProizvodService } from '../services/proizvod.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdminPopUpComponent } from '../admin-pop-up/admin-pop-up.component';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

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
  sirina: string;

  verifikacija: boolean = false;
  svePorudzbine: boolean = false;
  dodajProizvod: boolean = true;
  user: any;

  constructor(
    private mediaObs: MediaObserver,
    private _proizvodiService: ProizvodService,
    private _userService: UserService,
    private matDialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._userService.GetUserProfil().subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.subscribe = this.mediaObs.media$.subscribe((result: MediaChange) => {
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
      if (this.deviceXs) {
        this.sirina = '80%';
      } else {
        this.sirina = '40%';
      }
    });
    this.GetProizvodi();
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
  GetProizvodi() {
    this._proizvodiService
      .GetProizvodi()
      .subscribe((data) => (this.pice = data));
  }
  ObrisiProizvod(pica: Pica) {
    console.log(this.pice);
    this._proizvodiService
      .DeleteProizvodi(pica.proizvodId)
      .subscribe((data) => {
        this.pica = data;
        // this.toastr.info('ID:' + this.pica.proizvodId, 'Ime:' + this.pica.ime);
        this.toastr.success(
          'Id:' + this.pica.proizvodId + '  Ime:' + this.pica.ime,
          'Obrisali ste proizvod:'
        );
        this.GetProizvodi();
      });
  }
  DodajProizvod() {
    let dialogRef = this.matDialog.open(AdminPopUpComponent, {
      width: this.sirina,
      height: '66%',
      disableClose: true,
      data: { naziv: 'dodajBtn' },
    });
    dialogRef
      .afterClosed()
      .subscribe(() =>
        this._proizvodiService
          .GetProizvodi()
          .subscribe((data) => (this.pice = data))
      );
  }
  EditujProizvod(pica: Pica) {
    let dialogRef = this.matDialog.open(AdminPopUpComponent, {
      width: this.sirina,
      height: '66%',
      data: { naziv: 'editujBtn', pica: pica },
    });
    dialogRef
      .afterClosed()
      .subscribe(() =>
        this._proizvodiService
          .GetProizvodi()
          .subscribe((data) => (this.pice = data))
      );
  }
}
