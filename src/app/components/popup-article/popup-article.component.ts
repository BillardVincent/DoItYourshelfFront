import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/classes/article';
import { ArticlePattern } from 'src/app/classes/article-pattern';
import { ArticlePatternService } from 'src/app/services/article-pattern.service';
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
              private articlePatternService: ArticlePatternService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar

  ) {
    this.articleId = data.articleId;
  }

  articleId: number;
  private subscription: Subscription;
  charged: boolean;
  article: Article;
  articleEdited: Article;
  editArticle: boolean;
  artPattern$: ArticlePattern[];
  artPatName: string;
  delete: boolean;

  editArticleForm: FormGroup;
  articleName: FormControl;
  articlePatternId: FormControl;
  articleAlias: FormControl;
  quantity1: FormControl;
  quantity2: FormControl;
  quantity3: FormControl;

  private loadFormArticle() {
    this.articleName = new FormControl(this.article.name, [Validators.required, Validators.minLength(3)]);
    this.articleAlias = new FormControl(this.article.alias);
    this.articlePatternId = new FormControl(this.article.artPatId);
    this.quantity1 = new FormControl('', [Validators.min(0)]);
    this.quantity2 = new FormControl('', [Validators.min(0)]);
    this.quantity3 = new FormControl('', [Validators.min(0)]);
    this.editArticleForm = this.formBuilder.group({
      nameFC: this.articleName,
      patternIdFC: this.articlePatternId,
      aliasFC: this.articleAlias,
      quantity1: this.quantity1,
      quantity2: this.quantity2,
      quantity3: this.quantity3,
    });
  }

  loadAllArticlePattern() {
    this.subscription = this.articlePatternService.getAllPattern().subscribe(
      (data: ArticlePattern[]) => {
        this.artPattern$ = data;
        this.charged = true;

      }
    );
  }

  editThisArticle() {
    this.editArticle = true;
    this.charged = false;
    this.loadFormArticle();
    this.loadAllArticlePattern();
  }

  edit() {
    this.charged = false;
    this.artPattern$.forEach(artPat => {
      if (artPat.id === this.articlePatternId.value){
        this.artPatName = artPat.name;
      }
    });
    this.articleEdited = { id: this.articleId,
                          name: this.articleName.value,
                          alias: this.articleAlias.value,
                          artPatId: this.articlePatternId.value,
                          artPatName: this.artPatName,
                          projectId: 0,
                          qOfArtId: 0,
                        quantity1: this.quantity1.value,
                        quantity2: this.quantity2.value,
                        quantity3: this.quantity3.value
                      };
    this.articleService.postCreateOrUpdtateArticle(this.articleEdited).subscribe(
      (() => {
        this.snackBar.open('Article modifié !', 'OK', { duration: 2000 });
        this.article =  this.articleEdited;
        this.editArticle = false;
        this.charged = true;
      })
    );
  }
  cancel() {
    this.editArticle = false;
  }

  deleteArticle(){
    this.subscription = this.articleService.getDeleteArticle(this.article.id).subscribe(
      () => {
      console.log('in pop up');

      this.snackBar.open('Article supprimé !', 'OK', { duration: 2000 });
      this.dialogRef.close(true);
      });
  }
  ngOnInit(): void {

    this.subscription = this.articleService.getArticle(this.articleId).subscribe(
      (data: Article) => {
        this.article = data;
        this.charged = true;
      }
    );
  }
}
