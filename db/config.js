import dotenv from 'dotenv';

dotenv.config();

export default {
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  dialect: process.env.DB_DIALECT || 'postgres', // Ou 'mysql', 'sqlite', etc.
};