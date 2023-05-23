import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TechStack } from './techstack';

@Injectable({
  providedIn: 'root',
})
export class RankService {
  //next to do api call
  private apiUrl = 'http://localhost:80/techstacks';

  techStacks$ = this.http.get<TechStack[]>(this.apiUrl, {
    params: {
      limit: '15',
    },
  });
  constructor(private http: HttpClient) {}
}
