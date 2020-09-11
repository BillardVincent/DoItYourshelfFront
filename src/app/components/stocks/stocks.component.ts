import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/classes/article';
import { Subscription } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  articles$: Article[];
  charged: boolean;
  newArticle: boolean;
  private subscription: Subscription;

  art = {
    id: 0,
    name: '',
    alias: ''
  };
  articleCreated = new Article(this.art);

  newArticleForm: FormGroup;
  name: FormControl;




  constructor(private articleService: ArticleService, private formBuilder: FormBuilder) {
    this.loadForm();
  }

  ngOnInit(): void {
    this.getAllArticles();
  }
  private loadForm() {
    //FormControl('champ' par défaut, parmetres)
    this.name = new FormControl('', Validators.required);

    this.newArticleForm = this.formBuilder.group({
      nameFC: this.name
    });
  }

  getAllArticles() {
    this.subscription = this.articleService.getAllArticles().subscribe(
      (data: Article[]) => {
        this.articles$ = data;
        this.charged = true;
      }
    )
  }

  details() {

  }
  openCreatePanel() {
    this.newArticle = !this.newArticle;
  }

  createArticle() {
    this.articleCreated.name = this.name.value;
    this.charged = false;
    this.articleService.postCreateOrUpdtateArticle(this.articleCreated).subscribe(
      (() => {this.getAllArticles();
      })
    );
    this.newArticle = !this.newArticle;
  }

  ngOnDestroy(): void {
    // eviter les fuites de memoires
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
