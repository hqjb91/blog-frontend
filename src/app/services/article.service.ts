import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article, ArticlesResponse } from '../models/Article';

@Injectable({providedIn: 'root'})
export class ArticleService {

    baseURL: string = 'https://hequanjie.com';

    /**
     * This method returns all the articles stored in the database with pagination
     * @param limit 
     * @param offset 
     * @returns Observable list of articles
     */
    getAllArticles(limit: string, offset: string, tag: string, category: string): Observable<ArticlesResponse> {
        const queryParams = new HttpParams().set('limit', limit).set('offset', offset).set('tag', tag).set('category', category);

        return this.http.get<ArticlesResponse>(`${this.baseURL}/api/article`, {params: queryParams});
    }

    /**
     * This method returns the total number of articles stored in the database
     */
    getArticleById(id: number): Observable<{success: Boolean, article: Article}> {
        const queryParams = new HttpParams().set('limit', "").set('offset', "").set('tag', "").set('category', "");
        return this.http.get<{success: Boolean, article: Article}>(`${this.baseURL}/api/article?id=${id}`, {params: queryParams});
    }

    /**
     * This method returns the total number of articles stored in the database
     */
    getTotalAmountOfArticles(tag: string, category: string): Observable<{success: Boolean, length: number}> {
        const queryParams = new HttpParams().set('tag', tag).set('category', category);

        return this.http.get<{success: Boolean, length: number}>(`${this.baseURL}/api/article/length`, {params: queryParams});
    }

    /**
     * This method returns a map of tags
     */
    getAllTags(): Observable<{success: Boolean, tags: any}> {
        return this.http.get<{success: Boolean, tags: any}>(`${this.baseURL}/api/article/tags`);
    }

    /**
     * This method returns a map of categories
     */
    getAllCategories(): Observable<{success: Boolean, categories: any}> {
        return this.http.get<{success: Boolean, categories: any}>(`${this.baseURL}/api/article/categories`);
    }

    /**
     * This method posts an article to the backend
     */
    postArticle(title: string, summary: string, content: string, image: string, date: string, category: string, tags: string, username: string): Observable<{success: Boolean, result: any}> {
        return this.http.post<{success: Boolean, result: any}>(`${this.baseURL}/api/article`, {title, summary, content, date, category, tags, username, image});
    }

    constructor(private http: HttpClient) { }
}