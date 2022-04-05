import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Pica from '../models/Pica';

@Injectable({
  providedIn: 'root',
})
export class ProizvodService {
  constructor(private http: HttpClient) {}

  GetProizvodi(): Observable<Pica[]> {
    return this.http.get<Pica[]>('http://localhost:5000/api/proizvod');
  }
}
