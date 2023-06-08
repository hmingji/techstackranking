import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrapService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:80';
  //crud operation on command
  //start scrap request
}
