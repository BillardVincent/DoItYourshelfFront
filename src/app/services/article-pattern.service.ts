import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticlePattern } from '../classes/article-pattern';

@Injectable({
  providedIn: 'root'
})
export class ArticlePatternService {

  private readonly URL = `http://localhost:8080/pattern`;
  constructor(private http: HttpClient) { }

  public getAllPattern(): Observable<ArticlePattern[]> {
    return this.http.get<ArticlePattern[]>(`${this.URL}`).pipe(
      map((artPatternList: ArticlePattern[]) => {
        return artPatternList.map((articlePattern: ArticlePattern) => {
          return new ArticlePattern(articlePattern);
        });
      })
    );
  }
  public getArticlePattern(artPatternId: number): Observable<ArticlePattern> {
    return this.http.get<ArticlePattern>(`${this.URL}/details/${artPatternId}`);
  }

  public postCreateOrUpdtateArtPattern(articlePattern: ArticlePattern): Observable<any> {
    return (this.http.post(`${this.URL}/createOrUpdate`, articlePattern));

  }
}
