import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/main/navbar.component';
import { HomeComponent } from './components/main/home.component';
import { AboutComponent } from './components/main/about.component';
import { TagsComponent } from './components/main/tags.component';
import { CategoriesComponent } from './components/main/categories.component';
import { ArticleComponent } from './components/articles/article.component';
import { LoginComponent } from './components/users/login.component';
import { MaterialModule } from './modules/material/material.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    TagsComponent,
    CategoriesComponent,
    ArticleComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
