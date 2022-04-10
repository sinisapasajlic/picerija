import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Korisnik from '../../models/Korisnik';
import { BASE_USER_URL } from 'src/environments/environment';
import { registerLocaleData } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  RegistrujSe(korisnik: Korisnik): Observable<any> {
    let url = BASE_USER_URL + 'user/register';
    return this.http.post<any>(url, korisnik);
  }
  PrijaviSe(loginData: any): Observable<any> {
    let url = BASE_USER_URL + 'user/login';
    return this.http.post<any>(url, loginData);
  }
  GetUserProfil(): Observable<any> {
    let url = BASE_USER_URL + 'userprofil';
    return this.http.get<any>(url);
  }
}
