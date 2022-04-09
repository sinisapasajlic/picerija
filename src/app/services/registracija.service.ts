import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Korisnik from '../../models/Korisnik';
import { BASE_USER_URL } from 'src/environments/environment';
import { registerLocaleData } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class RegistracijaService {
  constructor(private http: HttpClient) {}
  RegistrujSe(korisnik: Korisnik): Observable<any> {
    let url = BASE_USER_URL + 'register';
    return this.http.post<any>(url, korisnik);
  }
}
