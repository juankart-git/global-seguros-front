import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rate } from '../interfaces/rate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/rates/';
  }

  getListRates(): Observable<Rate[]> {
    return this.http.get<Rate[]>(this.myAppUrl + this.myApiUrl);
  }

  getRate(id: number): Observable<Rate> {
    return this.http.get<Rate>(this.myAppUrl + this.myApiUrl + id);
  }

  deleteRate(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + id);
  }

  saveRate(product: Rate): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, product);
  }

  editRate(id: number, product: Rate): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + id, product);
  }
  
}

