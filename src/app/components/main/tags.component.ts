import { Component, OnInit } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
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
      width: 0.8,
      height: 400,
      overflow: false,
      zoomOnHover: {
        scale: 2,
        transitionTime: 0.8,
        delay: 0
      },
      realignOnResize: true,
      randomizeAngle: true,
      font: 'small-caps bold 15px Calibri, sans-serif'
    };

   data: CloudData[] = [];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.initialiseData();
  }

  initialiseData(){
    const results: any = [];
    this.articleService.getAllTags()
      .subscribe( res => {
      for(let key in res.tags) {
        results.push({
          text: key, weight: parseInt(res.tags[key]), color: '#ffffff', link: 'https://google.com'
        })
      }
    });

    setTimeout(()=> { // Hacky way to be replaced with promises
      const changedData$: Observable<CloudData[]> = of(results);
      changedData$.subscribe(res => this.data = res);
    },1000);
  }
}
