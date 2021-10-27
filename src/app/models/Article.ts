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

export interface ArticleResponse {
    success: string;
    articles: Array<Article>;
}