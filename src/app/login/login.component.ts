import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  forma: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.forma = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
    });
    this.forma.valueChanges.subscribe(console.log);
  }
  Prijava() {
    console.log(this.forma.value);
  }
}
