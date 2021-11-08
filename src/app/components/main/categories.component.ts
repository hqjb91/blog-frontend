import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { Observable, of } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  /**
   * Initialise the component class variables
   */
   options: CloudOptions = {
    width: 0.8,
    height: 400,
    overflow: false,
    zoomOnHover: {
      scale: 1.2,
      transitionTime: 0.8,
      delay: 0
    },
    realignOnResize: true,
    font: 'small-caps bold 10px Calibri, sans-serif'
  };

 data: CloudData[] = [];

constructor(private articleService: ArticleService, private router: Router) { }

ngOnInit(): void {
  this.initialiseData();
}

initialiseData(){
  const results: any = [];
  this.articleService.getAllCategories()
    .subscribe( res => {
    for(let key in res.categories) {
      results.push({
        text: key, weight: parseInt(res.categories[key]), color: '#000000'
      })
    }
    const changedData$: Observable<CloudData[]> = of(results);
    changedData$.subscribe(res => this.data = res);
    });
  }

  viewCategories(clicked: CloudData){
    this.router.navigate(['category',clicked.text]);
  }
}
