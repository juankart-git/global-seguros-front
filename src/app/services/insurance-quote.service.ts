import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InsuranceQuote } from '../interfaces/insurance-quote';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsuranceQuoteService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/insurance-quotes/';
  }

  getListInsuranceQuotes(): Observable<InsuranceQuote[]> {
    return this.http.get<InsuranceQuote[]>(this.myAppUrl + this.myApiUrl);
  }

  getListActiveInsuranceQuotes(): Observable<InsuranceQuote[]> {
    return this.http.get<InsuranceQuote[]>(this.myAppUrl + this.myApiUrl + 'active');
  }

  getListInsuranceQuote(id: number): Observable<InsuranceQuote> {
    return this.http.get<InsuranceQuote>(this.myAppUrl + this.myApiUrl + id);
  }

  deleteInsuranceQuotes(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + id);
  }

  saveInsuranceQuotes(product: InsuranceQuote): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, product);
  }

  editInsuranceQuotes(id: number, product: InsuranceQuote): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + id, product);
  }
}
