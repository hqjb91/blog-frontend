import { Component, OnInit } from '@angular/core';
import { CloudData, CloudOptions, ZoomOnHoverOptions } from 'angular-tag-cloud-module';
import { Observable, of } from 'rxjs';
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
   options: CloudOptions = {
      width: 1000,
      height: 400,
      overflow: false,
   };

   zoomOnHoverOptions: ZoomOnHoverOptions = {
    scale: 1.5,
    transitionTime: 1.2,
    delay: 0.8
  };

   data: CloudData[] = [
      {text: 'test1', weight: 8, link: 'https://google.com', color: '#fff'},
      {text: 'test2', weight: 10, link: 'https://google.com', color: '#fff'},
   ];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getAllTags()
    .subscribe( res => {
      for(let key in res.tags) {
        this.data.push({
          text: key, weight: parseInt(res.tags[key]), link: 'https://google.com', color: '#fff'
        })
      }
      this.newData(this.data);
    });
  }

  newData(data: any){
    const changedData$: Observable<CloudData[]> = of(data);
    changedData$.subscribe(res => this.data = res);
  }

}
