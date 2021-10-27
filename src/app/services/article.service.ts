import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleResponse } from '../models/Article';

@Injectable({providedIn: 'root'})
export class ArticleService {

    constructor(private http: HttpClient) { }

    /**
     * This method returns all the articles stored in the database with pagination
     * @param limit 
     * @param offset 
     * @returns Observable list of articles
     */
    getAllArticles(limit: string, offset: string): Observable<ArticleResponse> {
        const queryParams = new HttpParams().set('limit', 10).set('offset', 0);

        return this.http.get<ArticleResponse>('/api/article', {params: queryParams});
    }
}