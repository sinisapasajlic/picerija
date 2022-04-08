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
    return this.http.get<Pica[]>('http://localhost:5000/api/proizvod');
  }
  DeleteProizvodi(id: number): Observable<Pica> {
    let url = BASE_PROIZVOD_URL + 'deleteproizvod' + `/${id}`;
    console.log(url);
    return this.http.delete<Pica>(url);
  }
  AddProizvod(pica: Pica): Observable<Pica> {
    let url = BASE_PROIZVOD_URL + 'addproizvod';
    return this.http.post<Pica>(url, pica);
  }
  UpdateProizvod(pica: Pica): Observable<Pica> {
    let url = BASE_PROIZVOD_URL + 'updateproizvod';
    return this.http.patch<Pica>(url, pica);
  }
}
