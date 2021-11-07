import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { title } from 'process';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    summary: new FormControl(''),
    content: new FormControl(''),
    image: new FormControl(''),
    date: new FormControl(''),
    category: new FormControl(''),
    tags: new FormControl(''),
  });

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      const { title, summary, content, image, date, category, tags, username } = this.form.value;
      this.articleService.postArticle(title, summary, content, image, date, category, tags, username)
              .subscribe( response => {
                console.log(response.result);
              });
    }
  }

}
