import { readFile } from 'node:fs/promises';
import { pool } from './client.js';
const sql = await readFile(new URL('../../sql/001_initial.sql', import.meta.url), 'utf8');
await pool.query(sql); await pool.end(); console.log('Migration complete');
