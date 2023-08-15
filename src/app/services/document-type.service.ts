import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentType } from '../interfaces/document-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/document-types/';
  }

  getListDocumentTypes(): Observable<DocumentType[]> {
    return this.http.get<DocumentType[]>(this.myAppUrl + this.myApiUrl);
  }

  getListDocumentType(id: number): Observable<DocumentType> {
    return this.http.get<DocumentType>(this.myAppUrl + this.myApiUrl + id);
  }

  deleteListDocumentType(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + id);
  }

  saveListDocumentType(product: DocumentType): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, product);
  }

  editListDocumentType(id: number, product: DocumentType): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + id, product);
  }
}

