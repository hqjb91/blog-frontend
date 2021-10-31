import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      scale: 1.5,
      transitionTime: 0.8,
      delay: 0
    },
    realignOnResize: true,
    randomizeAngle: true,
    font: 'small-caps bold 8px Calibri, sans-serif'
  };

   data: CloudData[] = [];

  constructor(private articleService: ArticleService, private router: Router) { }

  ngOnInit(): void {
    this.initialiseData();
  }

  initialiseData(){
    const results: any = [];
    this.articleService.getAllTags()
      .subscribe( res => {
      for(let key in res.tags) {
        results.push({
          text: key, weight: parseInt(res.tags[key]), color: '#ffffff'
        })
      }
      const changedData$: Observable<CloudData[]> = of(results);
      changedData$.subscribe(res => this.data = res);
    });
  }

  viewTags(clicked: CloudData){
    this.router.navigate(['tag',clicked.text]);
  }
}
