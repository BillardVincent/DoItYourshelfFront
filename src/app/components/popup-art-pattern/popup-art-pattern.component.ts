import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticlePattern } from 'src/app/classes/article-pattern';
import { Format } from 'src/app/classes/format';
import { ArticlePatternService } from 'src/app/services/article-pattern.service';
import { StocksComponent } from '../stocks/stocks.component';

@Component({
  selector: 'app-popup-art-pattern',
  templateUrl: './popup-art-pattern.component.html',
  styleUrls: ['./popup-art-pattern.component.css']
})
export class PopupArtPatternComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<StocksComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private artPatternService: ArticlePatternService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar
    ){}

  artPat = {
    id: 0,
    name: '',
    formatId: 0,
  };

  artPattern = new ArticlePattern(this.artPat);

  newPatternForm: FormGroup;
  patternName: FormControl;
  id: FormControl;
  formats: Format[];
  formatSelected: Format = {id: 0, name: '', unit: '', unitName: '', nbDimension: 0};

  error: boolean;

  ngOnInit(): void {
    this.loadFormPattern();
    this.formats = JSON.parse(localStorage.getItem('formats'));
  }

  loadFormPattern() {
    this.patternName = new FormControl('', [Validators.required]);
    this.id = new FormControl('', [Validators.required]);
    this.newPatternForm = this.formBuilder.group({
      name: this.patternName,
      id: this.id,
    });
  }

  onError() {

  }
  
  createPattern(){
    this.artPattern = { id: 0, name: this.patternName.value, formatId: this.id.value};
    this.artPatternService.postCreateOrUpdtateArtPattern(this.artPattern).subscribe(
      (() => {
        this.snackBar.open(`Modèle d'article créé !`, 'OK', {duration: 2000});
        this.dialogRef.close();
      }),
      (error => this.error = error
      )
    );
  }

}
