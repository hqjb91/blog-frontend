import { Component, OnInit } from '@angular/core';
import { ArticleWithoutContent } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/article.service';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  /**
   * Initialise the component class variables
   */
  articles: Array<ArticleWithoutContent> = [];
  length: number = 0;
  limit: number = 8;
  offset: number = 0;
  pageSizeOptions = [4, 8, 12];
  tag: string = '';
  category: string = '';

  constructor(private articleService: ArticleService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tag = params.tag ? params.tag : '';
      this.category = params.category ? params.category : '';
      
      this.articleService.getTotalAmountOfArticles(this.tag, this.category).subscribe( res => this.length = res.length );
      this.articleService.getAllArticles(this.limit.toString(), this.offset.toString(), this.tag, this.category)
        .subscribe( res => this.articles = res.articlesSlice );
    });
  }

  onChangePage(pe: PageEvent) {
    this.limit = pe.pageSize;
    this.offset = pe.pageIndex * pe.pageSize;
    this.articleService.getAllArticles(this.limit.toString(), this.offset.toString(), this.tag, this.category)
    .subscribe( res => this.articles = res.articlesSlice );
  }

  navigateTo(path: string, params: string): void {
    this.router.navigate([path, params])
      .then(() => {
        window.location.reload();
      });
  }

}
