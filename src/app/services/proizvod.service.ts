import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Pica from '../../models/Pica';
import { BASE_PROIZVOD_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProizvodService {
  constructor(private http: HttpClient) {}

  GetProizvodi(): Observable<Pica[]> {
    let url = BASE_PROIZVOD_URL + 'proizvod';
    return this.http.get<Pica[]>(url);
  }
  DeleteProizvodi(id: number): Observable<Pica> {
    let url = BASE_PROIZVOD_URL + 'proizvod/deleteproizvod' + `/${id}`;
    console.log(url);
    return this.http.delete<Pica>(url);
  }
  AddProizvod(pica: Pica): Observable<Pica> {
    let url = BASE_PROIZVOD_URL + 'proizvod/addproizvod';
    return this.http.post<Pica>(url, pica);
  }
  UpdateProizvod(pica: Pica): Observable<Pica> {
    let url = BASE_PROIZVOD_URL + 'proizvod/updateproizvod';
    return this.http.patch<Pica>(url, pica);
  }
}
