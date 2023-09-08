import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductRate } from '../interfaces/product-rate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductRateService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/product-rates/';
  }

  getListProductRates(): Observable<ProductRate[]> {
    return this.http.get<ProductRate[]>(this.myAppUrl + this.myApiUrl);
  }

  getProductRate(id: number): Observable<ProductRate> {
    return this.http.get<ProductRate>(this.myAppUrl + this.myApiUrl + id);
  }

  getProductRateByYear(year: number): Observable<ProductRate> {
    return this.http.get<ProductRate>(this.myAppUrl + this.myApiUrl + 'year/' + year);
  }

  deleteProductRate(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + id);
  }

  saveProductRate(product: ProductRate): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, product);
  }

}
