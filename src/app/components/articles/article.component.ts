import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articleId: number = 0;
  article: Article = {
    id: 0, title: "", summary: "", content: "",
    image: "", date: new Date(), category: "",
    tags: [], username: "",
  };

  constructor(private route: ActivatedRoute, private articleServce: ArticleService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      this.articleId = parseInt(params.id);
    });
    this.articleServce.getArticleById(this.articleId).subscribe( res => this.article = res.article );
  }

}
