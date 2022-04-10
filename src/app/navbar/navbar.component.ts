import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() deviceXs: boolean;

  _localStorage: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this._localStorage = localStorage;
  }

  prijavaButton() {
    this.router.navigate(['/login']);
  }
  odjavaButton() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/home');
  }
  ClickHome() {
    this.router.navigate(['/home']);
  }
}
