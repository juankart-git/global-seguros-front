import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalProduct } from '../interfaces/global-product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalProductService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/global-products/';
  }

  getListGlobalProducts(): Observable<GlobalProduct[]> {
    return this.http.get<GlobalProduct[]>(this.myAppUrl + this.myApiUrl);
  }

  getListActiveGlobalProducts(): Observable<GlobalProduct[]> {
    return this.http.get<GlobalProduct[]>(this.myAppUrl + this.myApiUrl + 'active');
  }

  getListGlobalProduct(id: number): Observable<GlobalProduct> {
    return this.http.get<GlobalProduct>(this.myAppUrl + this.myApiUrl + id);
  }

  deleteListGlobalProducts(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + id);
  }

  saveListGlobalProducts(product: GlobalProduct): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, product);
  }

  editListGlobalProducts(id: number, product: GlobalProduct): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + id, product);
  }
}


