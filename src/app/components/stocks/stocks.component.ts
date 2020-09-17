import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/classes/article';
import { Subscription } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PopupArticleComponent } from '../popup-article/popup-article.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticlePattern } from 'src/app/classes/article-pattern';
import { ArticlePatternService } from 'src/app/services/article-pattern.service';
import { PopupArtPatternComponent } from '../popup-art-pattern/popup-art-pattern.component';

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
  isNewPattern: boolean;

  art = {
    id: 0,
    name: '',
    alias: '',
    artPatId: 0,
    artPatName: '',
  };
  articleCreated = new Article(this.art);
  articleSelected = new Article(this.art);
  articleId: number;

  artPat = {
    id: 0,
    name: '',
    format: '',
  };
  articlePattern = new ArticlePattern(this.artPat);
  artPatSelected = new ArticlePattern(this.artPat);

  artPattern$: ArticlePattern[];

  newArticleForm: FormGroup;
  name: FormControl;


  newPatternForm: FormGroup;
  patternName: FormControl;
  patternId: FormControl;




  constructor(
    private articleService: ArticleService,
    private articlePatternService: ArticlePatternService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {

    this.loadFormArticle();
    //this.loadFormPattern();

  }

  ngOnInit(): void {
    this.getAllArticles();
  }
/*
  loadFormPattern() {
    this.name = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.patternId = new FormControl('', [Validators.required]);

    this.newPatternForm = this.formBuilder.group({
      nameFC: this.name,
      patternId: this.patternId
    });
  }
  */
  private loadFormArticle() {
    this.name = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.patternId = new FormControl('', [Validators.required]);
    this.newArticleForm = this.formBuilder.group({
      nameFC: this.name,
      patternId: this.patternId
    });
  }

  getAllArticles() {
    this.subscription = this.articleService.getAllArticles().subscribe(
      (data: Article[]) => {
        this.articles$ = data;
        this.charged = true;
      }
    );
  }

  details(articleId) {
    this.openDetails(articleId);
  }

  openCreatePanel() {
    this.newArticle = !this.newArticle;
    this.loadAllArticlePattern();
  }

  createArticle() {
    this.articleCreated = {id:0, name: this.name.value, alias: '', artPatId: this.patternId.value, artPatName: ''};
   // this.articleCreated.name = this.name.value;
    // this.articleCreated.artPatId = this.patternId.value;
    this.charged = false;
    this.articleService.postCreateOrUpdtateArticle(this.articleCreated).subscribe(
      (() => {
        this.snackBar.open('Article créé !', 'OK');
        this.getAllArticles();
      })
    );
    this.newArticle = !this.newArticle;
  }

/*
  selectArtPattern(articlePattern: number){
    this.artPatSelected.id = articlePattern;
  }
*/

  loadAllArticlePattern(){
    this.subscription = this.articlePatternService.getAllPattern().subscribe(
      (data: ArticlePattern[]) => {
        this.artPattern$ = data;
        this.charged = true;
      }
    );
  }

  openDetails(articleId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.articleId = articleId;
    dialogConfig.data = {
      articleId : this.articleId
    };
    this.dialog.open(PopupArticleComponent, dialogConfig);
  }

  createPatternPop(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(PopupArtPatternComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.isNewPattern = result;
      if (this.isNewPattern) {
        this.charged = false;
        this.loadAllArticlePattern();
      }
    });
  }

  ngOnDestroy(): void {
    // eviter les fuites de memoires
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
