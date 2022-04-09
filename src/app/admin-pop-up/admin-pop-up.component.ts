import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Pica from 'src/models/Pica';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProizvodService } from '../services/proizvod.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-pop-up',
  templateUrl: './admin-pop-up.component.html',
  styleUrls: ['./admin-pop-up.component.css'],
})
export class AdminPopUpComponent implements OnInit {
  tip: string;
  pica: Pica;
  id: number;
  forma: FormGroup;
  forma1: FormGroup;
  dodavanje: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _proizvodiService: ProizvodService,
    private toastr: ToastrService
  ) {
    this.tip = data.naziv;
    this.pica = data.pica;
  }

  ngOnInit(): void {
    this.forma = this.fb.group({
      Ime: '',
      Velicina: '',
      Sastojci: '',
      Cena: '',
    });
    this.forma.valueChanges.subscribe();
    this.forma1 = this.fb.group({
      Ime: this.pica.ime,
      Velicina: this.pica.velicina,
      Sastojci: this.pica.sastojci,
      Cena: this.pica.cena,
    });
    this.forma1.valueChanges.subscribe(console.log);
  }
  DodajProizvod() {
    this.dodavanje = true;
    this.pica = this.forma.value;
    this._proizvodiService.AddProizvod(this.pica).subscribe((data) => {
      this.pica = data;
      this.dodavanje = false;
      this.toastr.success('Dodali ste novi proizvod', 'Dodavanje uspjesno!');
    });
  }
  IzmjeniProizvod() {
    this.dodavanje = true;
    this.id = this.pica.proizvodId;
    this.pica = this.forma1.value;
    this.pica.proizvodId = this.id;
    this._proizvodiService.UpdateProizvod(this.pica).subscribe(() => {
      this.dodavanje = false;
      this.toastr.success(
        'Uspjesno ste izmjenili proizvod',
        'Uspjsna izmjena!'
      );
    });
  }
}
