import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { WorkshopComponent } from './components/workshop/workshop.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { LibraryComponent } from './components/library/library.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import { MatButtonModule } from "@angular/material/button";
import {MatListModule} from '@angular/material/list';
import { PopupArticleComponent } from './components/popup-article/popup-article.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PopupArtPatternComponent } from './components/popup-art-pattern/popup-art-pattern.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    SignInComponent,
    WorkshopComponent,
    ProjectsComponent,
    LibraryComponent,
    WarehouseComponent,
    StocksComponent,
    ShoppingComponent,
    PopupArticleComponent,
    PopupArtPatternComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatSnackBarModule,
    MatButtonModule,
    MatRadioModule,
    MatProgressBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    FontAwesomeModule

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
