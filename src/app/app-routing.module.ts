import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './components/articles/article.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { AboutComponent } from './components/main/about.component';
import { CategoriesComponent } from './components/main/categories.component';
import { TagsComponent } from './components/main/tags.component';
import { LoginComponent } from './components/users/login.component';

/**
 * Routes is an array of JSON objects with path being the virtual path and 
 * component being the component to be loaded
 */
const routes: Routes = [
  { path:'', component: ArticlesComponent },
  { path:'login', component: LoginComponent },
  { path:'about', component: AboutComponent },
  { path:'tags', component: TagsComponent },
  { path:'categories', component: CategoriesComponent },
  { path:'article/:id', component: ArticleComponent },
  { path:'tag/:tag', component: ArticlesComponent },
  { path:'category/:category', component: ArticlesComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'} // Wildcard match
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
