import { Component, OnInit } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  /**
   * Initialise the component class variables
   */
   tags: any = {};
   options: CloudOptions = {
      width: 1000,
      height: 400,
      overflow: false,
   };

   data: CloudData[] = [
      {text: 'test1', weight: 8, link: 'https://google.com', color: 'hsla(' + (Math.random() * 360) + ', 100%, 50%, 1)'},
      {text: 'test2', weight: 10, link: 'https://google.com', color: 'hsla(' + (Math.random() * 360) + ', 100%, 50%, 1)'},
   ];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getAllTags()
    .subscribe( res => {
      for(let key in res.tags) {
        this.data.push({
          text: key, weight: parseInt(res.tags[key]), link: 'https://google.com', color: 'hsla(' + (Math.random() * 360) + ', 100%, 50%, 1)'
        })
      }
    });
  }

}
