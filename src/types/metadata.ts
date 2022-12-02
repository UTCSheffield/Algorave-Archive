export interface Imetadata {
    title: string;
    description: string;
    thumbnail: {
        url: string;
        width: number;
        height: number;
    }
    publishedAt: string;
}