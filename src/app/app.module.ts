import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { MaterialModule } from './modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/main/navbar.component';
import { AboutComponent } from './components/main/about.component';
import { TagsComponent } from './components/main/tags.component';
import { CategoriesComponent } from './components/main/categories.component';
import { ArticleComponent } from './components/articles/article.component';
import { LoginComponent } from './components/users/login.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { CreateArticleComponent } from './components/articles/create-article.component';

import { SafehtmlPipe } from './pipes/safehtml.pipe';
import { RunscriptsDirective } from './directives/runscripts.directive';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent, NavbarComponent,
    AboutComponent,
    TagsComponent, CategoriesComponent,
    ArticleComponent, LoginComponent,
    ArticlesComponent,
    SafehtmlPipe,
    RunscriptsDirective,
    CreateArticleComponent,
  ],
  imports: [
    BrowserModule, FlexLayoutModule,
    AppRoutingModule, BrowserAnimationsModule,
    MaterialModule, HttpClientModule,
    TagCloudModule, ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
