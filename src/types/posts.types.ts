export interface Posts {
    id: number,
    date: string,
    title: string,
    content: string,
    // forgein key
    malmobo_id: number,
    created_at: string
}

// typ för title som query params
export interface GetPostsByTitleQueryParams {
    title?: string;
}