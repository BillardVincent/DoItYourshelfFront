import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/classes/article';
import { Subscription } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Message } from 'src/app/classes/message';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  articles$: Article[];
  //charged: boolean;
  charged = true;
  newArticle: boolean;
  message : Message = {message : ''};
  messagetxt: string;
  private subscription: Subscription;

  newArticleForm: FormGroup;
  articleName: FormControl;

  art = {
    id: 0,
    name: '',
    alias: ''
  };
  articleCreated = this.art;


  constructor(private articleService: ArticleService, private formBuilder: FormBuilder) {
    this.loadForm();
  }

  ngOnInit(): void {
    this.getAllArticles();
  }
  private loadForm() {
    this.articleName = new FormControl('');
    this.newArticleForm = this.formBuilder.group({
      nameFC: this.articleName
    })
  }
  getAllArticles() {
    this.subscription = this.articleService.getAllArticles().subscribe(
      (data: Article[]) => {
        this.articles$ = data;
        this.charged = true;
      }
    )
    console.log('allArt');
  }

  details() {

  }
  openCreatePanel() {
    this.newArticle = !this.newArticle;
  }

  createArticle() {
    console.log(this.newArticleForm);
    this.articleCreated.name = this.articleName.value;
    console.log(this.articleCreated.name);
    this.newArticle = !this.newArticle;
    this.articleService.postCreateOrUpdtateArticle(this.articleCreated);
        this.newArticle = !this.newArticle;
        console.log('paf');

    this.getAllArticles();
  }

  ngOnDestroy(): void {
    // eviter les fuites de memoires
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
