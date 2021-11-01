import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article, ArticlesResponse } from '../models/Article';

@Injectable({providedIn: 'root'})
export class ArticleService {

    /**
     * This method returns all the articles stored in the database with pagination
     * @param limit 
     * @param offset 
     * @returns Observable list of articles
     */
    getAllArticles(limit: string, offset: string, tag: string, category: string): Observable<ArticlesResponse> {
        const queryParams = new HttpParams().set('limit', limit).set('offset', offset).set('tag', tag).set('category', category);

        return this.http.get<ArticlesResponse>('/api/article', {params: queryParams});
    }

    /**
     * This method returns the total number of articles stored in the database
     */
    getArticleById(id: number): Observable<{success: Boolean, article: Article}> {
        const queryParams = new HttpParams().set('limit', "").set('offset', "").set('tag', "").set('category', "");
        return this.http.get<{success: Boolean, article: Article}>(`/api/article?id=${id}`, {params: queryParams});
    }

    /**
     * This method returns the total number of articles stored in the database
     */
    getTotalAmountOfArticles(tag: string, category: string): Observable<{success: Boolean, length: number}> {
        const queryParams = new HttpParams().set('tag', tag).set('category', category);

        return this.http.get<{success: Boolean, length: number}>('/api/article/length', {params: queryParams});
    }

    /**
     * This method returns a map of tags
     */
    getAllTags(): Observable<{success: Boolean, tags: any}> {
        return this.http.get<{success: Boolean, tags: any}>('/api/article/tags');
    }

    /**
     * This method returns a map of categories
     */
    getAllCategories(): Observable<{success: Boolean, categories: any}> {
        return this.http.get<{success: Boolean, categories: any}>('/api/article/categories');
    }

    constructor(private http: HttpClient) { }
}