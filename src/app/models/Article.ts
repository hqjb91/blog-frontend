export interface ArticleWithoutContent {
    id: number;
    title: string;
    summary: string;
    image: string;
    date: Date;
    category: string;
    tags: Array<string>;
    username: string;
}

export interface Article {
    id: number;
    title: string;
    summary: string;
    content: string;
    image: string;
    date: Date;
    category: string;
    tags: Array<string>;
    username: string;
}

export interface ArticlesResponse {
    success: string;
    articlesSlice: Array<ArticleWithoutContent>;
}

export interface ArticleResponse {
    success: string;
    article: Article;
}