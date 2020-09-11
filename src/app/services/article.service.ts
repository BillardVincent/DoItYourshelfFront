import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../classes/article';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private readonly URL = `http://localhost:8080`;
  constructor(private http: HttpClient) { }

  public getAllArticles(): Observable<Article[]> {
    // get, put post renvoient tjs un observable
    // pipe de rx.js => observables
    return this.http.get<Article[]>(`${this.URL}/article`).pipe(
      // map permet de faire des opérations sur la listes
      map((articleList: Article[]) => {
        return articleList.map((article: Article) => {
          return new Article(article);
        });

      })
    );
  }

  public postCreateOrUpdtateArticle(article: Article): Observable<any> {
    return (this.http.post(`${this.URL}/article/createOrUpdate`, article));

  }
}
