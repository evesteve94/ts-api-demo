import pool from '../db';
import { MalmobosDTO } from '../dtos/malmobos.dto';
import { Malmobos } from '../types/malmobos.types';
import { QueryResult } from 'pg';

export const getAllMalmobos = async (): Promise<Malmobos[]> => {
    const result: QueryResult = await pool.query("SELECT * FROM malmobos");
    return result.rows;
};

export const getMalmoboById = async (id: number): Promise<Malmobos | null> => {
    const result: QueryResult = await pool.query("SELECT * FROM malmobos WHERE id = $1", [id]);
    return result.rows[0] || null;
};

export const createMalmobo = async (data: MalmobosDTO): Promise<Malmobos> => {
    const { name, nickname } = data;
    const result: QueryResult = await pool.query(
        "INSERT INTO malmobos (name, nickname) VALUES ($1, $2) RETURNING *",
        [name, nickname]
    );
    return result.rows[0];
};

export const updateMalmobo = async (id: number, data: MalmobosDTO): Promise<Malmobos | null> => {
    const { name, nickname } = data;
    const result: QueryResult = await pool.query(
        "UPDATE malmobos SET name = $1, nickname = $2 WHERE id = $3 RETURNING *",
        [name, nickname, id]
    );
    return result.rows[0] || null;
};

export const deleteMalmobo = async (id: number): Promise<Malmobos | null> => {
    const result: QueryResult = await pool.query("DELETE FROM malmobos WHERE id = $1 RETURNING *", [id]);
    return result.rows[0] || null;
};
