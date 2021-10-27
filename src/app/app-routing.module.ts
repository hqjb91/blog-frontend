import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './components/articles/articles.component';
import { AboutComponent } from './components/main/about.component';
import { CategoriesComponent } from './components/main/categories.component';
import { HomeComponent } from './components/main/home.component';
import { TagsComponent } from './components/main/tags.component';
import { LoginComponent } from './components/users/login.component';

/**
 * Routes is an array of JSON objects with path being the virtual path and 
 * component being the component to be loaded
 */
const routes: Routes = [
  { path:'', component: HomeComponent},
  { path:'login', component: LoginComponent },
  { path:'about', component: AboutComponent },
  { path:'tags', component: TagsComponent },
  { path:'categories', component: CategoriesComponent },
  { path:'articles', component: ArticlesComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'} // Wildcard match
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
