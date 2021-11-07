import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  encapsulation: ViewEncapsulation.None // Disable view encapsulation so css applied to dynamically inject html
})
export class ArticleComponent implements OnInit {

  articleId: number = 0;
  article: Article = {
    _id: 0, title: "", summary: "", content: ``,
    image: "", date: new Date(), category: "",
    tags: [ "" ], username: "",
  };

  constructor(private route: ActivatedRoute, private articleService: ArticleService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.articleId = params['id'];
    });
    this.articleService.getArticleById(this.articleId).subscribe( res => {
      this.article = res.article;
    });
  }

}
