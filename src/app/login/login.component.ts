import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  forma: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/dashboard']);
    }
    this.forma = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
    });
    this.forma.valueChanges.subscribe(console.log);
  }
  Prijava() {
    this._userService.PrijaviSe(this.forma.value).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/dashboard');
      },
      (err) => {
        if (err.status == 400) {
          this.toastr.error(err.error.message, 'Prijava neuspjesna');
        } else {
          console.log(err);
        }
      }
    );
  }
}
