import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.forma = this.fb.group(
      {
        Ime: ['', Validators.required],
        Prezime: ['', Validators.required],
        Username: ['', Validators.required],
        Email: ['', [Validators.required, Validators.email]],
        DatumRodjenja: ['', Validators.required],
        Adresa: ['', Validators.required],

        Password: ['', [Validators.required, Validators.minLength(4)]],
        ConfirmPassword: ['', [Validators.required]],

        TipKorisnika: ['', Validators.required],
      },
      {
        validators: this.Podudaranje('Password', 'ConfirmPassword'),
      }
    );
    this.forma.valueChanges.subscribe();
  }

  get f() {
    return this.forma.controls;
  }

  Registracija() {
    this.submitted = true;
    if (this.forma.invalid) {
      return;
    }
    console.log(this.convert(this.forma.value.DatumRodjenja));
  }
  convert(str: string) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
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
}
