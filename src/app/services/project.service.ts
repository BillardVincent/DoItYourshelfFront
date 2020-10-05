import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../classes/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly URL = `http://localhost:8080/project`;

  constructor(private http: HttpClient) { }

  public getStocks(userId): Observable<Project> {
    return this.http.get<Project>(`${this.URL}/stocks/${userId}}`);
  }
}
