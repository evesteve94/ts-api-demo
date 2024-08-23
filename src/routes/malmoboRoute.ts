import { Router, Request, Response, NextFunction } from 'express';
import pool from '../db';
import { QueryResult } from 'pg';
import { handleError } from '../utils/errorHandling';
import { malmoboSchema } from '../validation';

const router = Router();

// Middleware to validate Malmobo data
const validateMalmobo = (req: Request, res: Response, next: NextFunction) => {
    const { error } = malmoboSchema.validate(req.body, { abortEarly: false });
    if (error) {
        // Collecting all validation errors
        const errors = error.details.map(detail => detail.message);
        return res.status(400).json({ errors });
    }
    next();
};

// READ all Malmobos
router.get('/', async (req: Request, res: Response) => {
    try {
        const result: QueryResult = await pool.query("SELECT * FROM malmobos");
        res.json(result.rows);
    } catch (err) {
        handleError(err, res);
    }
});

// READ a single Malmobo by ID
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result: QueryResult = await pool.query("SELECT * FROM malmobos WHERE id = $1", [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send("Malmobo not found");
        }
    } catch (err) {
        handleError(err, res);
    }
});


// CREATE a new Malmobo
router.post('/', validateMalmobo, async (req: Request, res: Response) => {
    const { name, nickname } = req.body;
    try {
        const result: QueryResult = await pool.query(
            "INSERT INTO malmobos (name, nickname) VALUES ($1, $2) RETURNING *",
            [name, nickname]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        handleError(err, res);
    }
});

// UPDATE a Malmobo
router.put('/:id', validateMalmobo, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, nickname } = req.body;
    try {
        const result: QueryResult = await pool.query(
            "UPDATE malmobos SET name = $1, nickname = $2 WHERE id = $3 RETURNING *",
            [name, nickname, id]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send("Malmobo not found");
        }
    } catch (err) {
        handleError(err, res);
    }
});

// DELETE a Malmobo
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result: QueryResult = await pool.query("DELETE FROM malmobos WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length > 0) {
            res.status(204).send();
        } else {
            res.status(404).send("Malmobo not found");
        }
    } catch (err) {
        handleError(err, res);
    }
});

export default router;
