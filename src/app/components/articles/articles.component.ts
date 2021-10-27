import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/article.service';

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
  limit: number = 10;
  offset: number = 0;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getAllArticles(this.limit.toString(), this.offset.toString())
      .subscribe( res => this.articles = res.articles );
  }

}
