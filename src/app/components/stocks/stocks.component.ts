import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/classes/article';
import { Subscription } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  articles$: Article[];
  charged: boolean;
  newArticle: boolean;
  private subscription : Subscription;

  articleCreated : Article;
  newArticleForm : FormGroup;
  name : FormControl;




  constructor(private articleService: ArticleService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAllArticles();
  }

  getAllArticles(){
    this.subscription = this.articleService.getAllArticles().subscribe(
      (data: Article[])=>{
        this.articles$=data;
        this.charged = true;
      }
    )
  }

  details(){

  }
openCreatePanel(){
this.newArticle = !this.newArticle;
}

createArticle(){
this.articleCreated.name = name;
  this.articleService.postCreateOrUpdtateArticle(this.articleCreated)
}

  ngOnDestroy(): void {
    // eviter les fuites de memoires
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
