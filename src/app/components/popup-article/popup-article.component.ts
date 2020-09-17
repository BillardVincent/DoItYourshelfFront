import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/classes/article';
import { ArticleService } from 'src/app/services/article.service';
import { StocksComponent } from '../stocks/stocks.component';

@Component({
  selector: 'app-popup-article',
  templateUrl: './popup-article.component.html',
  styleUrls: ['./popup-article.component.css']
})
export class PopupArticleComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<StocksComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private articleService: ArticleService,
    ) {
      this.articleId = data.articleId;
     }

     articleId: number;
     private subscription: Subscription;
charged: boolean;
article: Article;

  ngOnInit(): void {

    this.subscription = this.articleService.getArticle(this.articleId).subscribe(
      (data: Article) => {
        this.article = data;
        this.charged = true;
      }
    );
  }
}
