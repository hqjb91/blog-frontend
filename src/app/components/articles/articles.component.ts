import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/article.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  /**
   * Initialise the component class variables
   */
  articles: Array<Article> = [];
  length: number = 0;
  limit: number = 8;
  offset: number = 0;
  pageSizeOptions = [4, 8, 12];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getTotalAmountOfArticles().subscribe( res => this.length = res.length );
    this.articleService.getAllArticles(this.limit.toString(), this.offset.toString())
      .subscribe( res => this.articles = res.articlesSlice );
  }

  onChangePage(pe: PageEvent) {
    this.limit = pe.pageSize;
    this.offset = pe.pageIndex * pe.pageSize;
    this.articleService.getAllArticles(this.limit.toString(), this.offset.toString())
    .subscribe( res => this.articles = res.articlesSlice );
    console.log(pe);
    console.log(`Page Limit is ${this.limit}. Page offset is ${this.offset}`);
  }

}
