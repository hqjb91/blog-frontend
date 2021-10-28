import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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
    id: 0, title: "Sample title", summary: "Sample summary", content: `<b>Sample content</b>`,
    image: "", date: new Date(), category: "Sample category",
    tags: [ "Sample tag" ], username: "Sample username",
  };
  data: any | SafeHtml = this.sanitizer.sanitize(SecurityContext.HTML, this.article.content);

  constructor(private route: ActivatedRoute, private articleService: ArticleService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.articleId = parseInt(params.id);
    });
    this.articleService.getArticleById(this.articleId).subscribe( res => {
      this.article = res.article;                      
      this.data = this.sanitizer.sanitize(SecurityContext.HTML, res.article.content);
    });
  }

}
