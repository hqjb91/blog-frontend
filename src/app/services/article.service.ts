import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleResponse } from '../models/Article';

@Injectable({providedIn: 'root'})
export class ArticleService {

    /**
     * This method returns all the articles stored in the database with pagination
     * @param limit 
     * @param offset 
     * @returns Observable list of articles
     */
    getAllArticles(limit: string, offset: string): Observable<ArticleResponse> {
        const queryParams = new HttpParams().set('limit', limit).set('offset', offset);

        return this.http.get<ArticleResponse>('/api/article', {params: queryParams});
    }

    /**
     * This method returns the total number of articles stored in the database
     */
    getTotalAmountOfArticles(): Observable<{success: Boolean, length: number}> {
        return this.http.get<{success: Boolean, length: number}>('/api/article/length');
    }
  
    constructor(private http: HttpClient) { }
}