import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistracijaService } from '../services/registracija.service';
import Korisnik from 'src/models/Korisnik';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;
  submitted: boolean = false;
  maxDatum: string;

  constructor(
    private fb: FormBuilder,
    private _registracijaService: RegistracijaService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.forma = this.fb.group(
      {
        Ime: ['', Validators.required],
        Prezime: ['', Validators.required],
        Username: ['', Validators.required],
        Email: ['', [Validators.required, Validators.email]],
        DatumRodjenja: ['', [Validators.required]],
        Adresa: ['', Validators.required],

        Password: ['', [Validators.required, Validators.minLength(6)]],
        ConfirmPassword: ['', [Validators.required]],

        TipKorisnika: ['', Validators.required],
      },
      {
        validators: this.Podudaranje('Password', 'ConfirmPassword'),
      }
    );
    this.datumDisable();
    this.forma.valueChanges.subscribe(console.log);
  }

  get f() {
    return this.forma.controls;
  }

  Registracija() {
    this.submitted = true;
    if (this.forma.invalid) {
      return;
    }
    var korisnik = new Korisnik();
    korisnik.Ime = this.forma.value.Ime;
    korisnik.Prezime = this.forma.value.Prezime;
    korisnik.UserName = this.forma.value.Username;
    korisnik.Email = this.forma.value.Email;
    korisnik.Slika = '';
    korisnik.Adresa = this.forma.value.Adresa;
    korisnik.Password = this.forma.value.Password;
    korisnik.datumRodjenja = this.forma.value.DatumRodjenja;
    korisnik.TipKorisnika = parseInt(this.forma.value.TipKorisnika);

    this._registracijaService.RegistrujSe(korisnik).subscribe((res) => {
      if (res.succeeded) {
        this.router.navigate(['/login']);
        this.toastr.success(
          'Novi korisnik je kreiran',
          'Registracija uspjesna!'
        );
      } else {
        res.errors.forEach((element: any) => {
          switch (element.code) {
            case 'DuplicateUserName':
              this.toastr.error(
                'Korisnicnko ime vec postoji',
                'Registracija neuspjesna'
              );
              break;
            default:
              break;
          }
        });
      }
    });
  }
  Podudaranje(str1: string, str2: string) {
    return (formGroup: FormGroup) => {
      const control1 = formGroup.controls[str1];
      const control2 = formGroup.controls[str2];
      if (control2.errors && !control2.errors?.['Podudaranje']) {
        return;
      }
      if (control1.value !== control2.value) {
        control2.setErrors({ Podudaranje: true });
      } else {
        control2.setErrors(null);
      }
    };
  }
  convert(str: string) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }
  datumDisable() {
    var datum: any = new Date();
    this.maxDatum = this.convert(datum);
  }
}
