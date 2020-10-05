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
import { Format } from 'src/app/classes/format';

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
  artPatName: string;
  dimensionDisplay: string;
  formatDisplay: Format = {id: 0, name: '', unitName : '', nbDimension: 0, unit: ''};
  transitoryFormatDisplay: Format = {id: 0, name: '', unitName : '', nbDimension: 0, unit: ''};

  format$: Format[];
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
  patternId: FormControl;
  alias: FormControl;
  quantity1: FormControl;
  quantity2: FormControl;
  quantity3: FormControl;

  newPatternForm: FormGroup;
  patternName: FormControl;

  private readonly PATTERN = 'pattern';


  constructor(
    private articleService: ArticleService,
    private articlePatternService: ArticlePatternService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {

    this.loadFormArticle();
    this.loadAllArticlePattern();
   // this.getStocks()

  }


  ngOnInit(): void {
    this.getAllArticles();
  }

  private loadFormArticle() {
    this.name = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.alias = new FormControl('', );
    this.patternId = new FormControl('', );
    this.quantity1 = new FormControl('', [Validators.min(0)]);
    this.quantity2 = new FormControl('', [Validators.min(0)]);
    this.quantity3 = new FormControl('', [Validators.min(0)]);
    this.newArticleForm = this.formBuilder.group({
      nameFC: this.name,
      patternId: this.patternId,
      alias: this.alias,
      quantity1: this.quantity1,
      quantity2: this.quantity2,
      quantity3: this.quantity3,

    });
  }
  /*
  getStocks() {
    this.subscription = this.projectService.getstocks().subscribe(
      (data: Article[]) => {
        this.articles$ = data;
        this.charged = true;
      }
    );
  }
  */

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
    this.newArticle = true;
  }

  formatDetermination(): Format|boolean{
  if (this.patternId.touched){
    this.transitoryFormatDisplay = {id: 0, name: '', unitName : '', nbDimension: 0, unit: ''};
    this.formatDisplay = {id: 0, name: '', unitName : '', nbDimension: 0, unit: ''};
    this.format$ = JSON.parse(localStorage.getItem('formats'));
    this.artPattern$.forEach(artPat => {
      if (artPat.id === this.patternId.value){
        this.transitoryFormatDisplay.id = artPat.formatId;
        this.format$.forEach(form =>{
          if (form.id === this.transitoryFormatDisplay.id){
            this.formatDisplay = form;
          }
        });
      }
    });
  }

  if (this.formatDisplay.unit !== ''){
  return this.formatDisplay;
  }
  else{
    return false;
  }
  }

  cancel() {
    this.newArticle = false;
  }

  createArticle() {
    this.artPattern$.forEach(artPat => {
      if (artPat.id === this.patternId.value){
        this.artPatName = artPat.name;
      }
    });
    this.articleCreated = {
      id: 0, name: this.name.value,
      alias: this.alias.value,
      artPatId: this.patternId.value,
      artPatName: this.artPatName,
      projectId: 0,
      qOfArtId: 0,
      quantity1: this.quantity1.value,
      quantity2: this.quantity2.value,
      quantity3: this.quantity3.value,
    };
    this.charged = false;
    this.articleService.postCreateOrUpdtateArticle(this.articleCreated).subscribe(
      (() => {
        this.snackBar.open('Article créé !', 'OK', {duration: 2000});
        this.getAllArticles();
      })
    );
    this.newArticle = !this.newArticle;
  }

  loadAllArticlePattern(){
    this.subscription = this.articlePatternService.getAllPattern().subscribe(
      (data: ArticlePattern[]) => {
        this.artPattern$ = data;
        this.charged = true;
        localStorage.setItem(this.PATTERN, JSON.stringify(this.artPattern$));
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
    this.subscription = this.dialog.open(PopupArticleComponent, dialogConfig).afterClosed().subscribe(
      (data : boolean) => {
        if (data){
          console.log('in stock, after popup');
          this.charged = false;
          this.getAllArticles();
        }}
    );
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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
