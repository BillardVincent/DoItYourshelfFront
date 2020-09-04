import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { WorkshopComponent } from './components/workshop/workshop.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { LibraryComponent } from './components/library/library.component';



const appRoutes : Routes =[
{path :'home', component :HomeComponent},
{path :'login', component :LoginComponent},
{path :'signin', component :SignInComponent},
{path :'shopping', component :ShoppingComponent},
{path :'workshop', component :WorkshopComponent},
{path :'warehouse', component :WarehouseComponent},
{path :'projects', component :ProjectsComponent},
{path :'stocks', component :StocksComponent},
{path :'library', component :LibraryComponent},


//redirige vers home si pas de précision
{path:'',redirectTo:"/home", pathMatch:'full'},

//gestion de la page not found
//'**' => "tout ce qui n'est pas ce qui est décrit ci dessus"
{path :'**', component:PageNotFoundComponent},



]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
