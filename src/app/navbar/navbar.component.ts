import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() deviceXs: boolean;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  prijavaButton() {
    this.router.navigate(['/login']);
  }
  ClickHome() {
    this.router.navigate(['/home']);
  }
}
