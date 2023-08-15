import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../interfaces/state';
import { City } from '../interfaces/city';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private myAppUrl: string;
  private statesPath: string;
  private citiesPath: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = 'http://localhost:3000/';
    this.statesPath = 'api/states/';
    this.citiesPath = 'api/cities/';
  }

  getStates(): Observable<State[]> {
    return this.http.get<State[]>(this.myAppUrl + this.statesPath);
  }

  getCities(id: number): Observable<City[]> {
    return this.http.get<City[]>(this.myAppUrl + this.citiesPath + id);
  }
  
}

