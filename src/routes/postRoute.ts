import { Router, Request, Response } from 'express';
import pool from '../db';
import { QueryResult } from 'pg';
import { handleError } from '../utils/errorHandling';

const router = Router();

// READ all Posts
router.get('/', async (req: Request, res: Response) => {
    try {
        const result: QueryResult = await pool.query("SELECT * FROM posts");
        res.json(result.rows);
    } catch (err) {
        handleError(err, res);
    }
});

// READ a single Post by ID
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result: QueryResult = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send("Post not found");
        }
    } catch (err) {
        handleError(err, res);
    }
});

// CREATE a new Post
router.post('/', async (req: Request, res: Response) => {
    const { title, content, malmobo_id } = req.body;
    try {
        const result: QueryResult = await pool.query(
            "INSERT INTO posts (title, content, malmobo_id) VALUES ($1, $2, $3) RETURNING *",
            [title, content, malmobo_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        handleError(err, res);
    }
});


// UPDATE a Post
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { date, title, content, malmobo_id, created_at } = req.body;
    try {
        const result: QueryResult = await pool.query(
            "UPDATE posts SET date = $1, title = $2, content = $3, malmobo_id = $4, created_at = $5 WHERE id = $6 RETURNING *",
            [date, title, content, malmobo_id, created_at, id]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send("Post not found");
        }
    } catch (err) {
        handleError(err, res);
    }
});

// DELETE a Post
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result: QueryResult = await pool.query("DELETE FROM posts WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length > 0) {
            res.status(204).send();
        } else {
            res.status(404).send("Post not found");
        }
    } catch (err) {
        handleError(err, res);
    }
});

export default router;
