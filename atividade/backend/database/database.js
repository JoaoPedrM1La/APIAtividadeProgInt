import { Pool } from 'pg';

const pool = new Pool({
    host: 'postgres',
    port: 5432,
    user: process.env.POSTGRES_USER || 'joao',
    password: process.env.POSTGRES_PASSWORD || 12345,
    database: process.env.POSTGRES_DB || biblioteca
});

export default pool;