import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config(); // Ensure this is at the top

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('DATABASE_URL is not defined');
}

const pool = new Pool({
    connectionString,
});

export default pool;
