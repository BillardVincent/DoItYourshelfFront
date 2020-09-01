import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';



const appRoutes : Routes =[
{path :'home', component :HomeComponent},
{path :'login', component :LoginComponent},
{path :'signin', component :SignInComponent},

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
