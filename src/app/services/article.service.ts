import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../classes/article';
import { map } from 'rxjs/operators';
import { ArticleDetailed } from '../classes/article-detailed';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private readonly URL = `http://localhost:8080/article`;
  constructor(private http: HttpClient) { }

  public getAllArticles(): Observable<Article[]> {
    // get, put post renvoient tjs un observable
    // pipe de rx.js => observables
    return this.http.get<Article[]>(`${this.URL}`).pipe(
      // map permet de faire des opérations sur la listes
      map((articleList: Article[]) => {
        return articleList.map((article: Article) => {
          return new Article(article);
        });

      })
    );
  }
  public getArticle(articleId: number): Observable<ArticleDetailed> {
    return this.http.get<ArticleDetailed>(`${this.URL}/details/${articleId}`);
  }

  public postCreateOrUpdtateArticle(article: Article): Observable<any> {
    return (this.http.post(`${this.URL}/createOrUpdate`, article));
  }

  public getDeleteArticle(id: number): Observable<any> {
    console.log(`in delete function`);

    return (this.http.get(`${this.URL}/delete/${id}`));

  }
}
