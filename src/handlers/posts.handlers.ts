// src/handlers/postHandlers.ts

import pool from '../db';
import { QueryResult } from 'pg';
import { PostsDTO } from '../dtos/posts.dto'

//                              title som parameter
export const getAllPosts = async (title?: string): Promise<PostsDTO[]> => {
    let query = "SELECT * FROM posts";
    const queryParams: string[] = [];

    //om title finns läggs en Query till för att filtrera resultat
    if (title) {
        query += " WHERE title ILIKE $1";
        queryParams.push(`%${title}%`);
    }

    const result = await pool.query(query, queryParams);
    return result.rows;
};

export const getPostById = async (id: number): Promise<PostsDTO | null> => {
    const result: QueryResult = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
};

export const createPost = async (post: PostsDTO): Promise<PostsDTO> => {
    const { title, content, malmobo_id } = post;
    const result: QueryResult = await pool.query(
        "INSERT INTO posts (title, content, malmobo_id) VALUES ($1, $2, $3) RETURNING *",
        [title, content, malmobo_id]
    );
    return result.rows[0];
};

export const updatePost = async (id: number, post: PostsDTO): Promise<PostsDTO | null> => {
    const { title, content, malmobo_id, created_at } = post;
    const result: QueryResult = await pool.query(
        "UPDATE posts SET title = $1, content = $2, malmobo_id = $3, created_at = $4 WHERE id = $5 RETURNING *",
        [title, content, malmobo_id, created_at, id]
    );
    return result.rows.length > 0 ? result.rows[0] : null;
};

export const deletePost = async (id: number): Promise<PostsDTO | null> => {
    const result: QueryResult = await pool.query("DELETE FROM posts WHERE id = $1 RETURNING *", [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
};
