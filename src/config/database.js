import pg from 'pg';
import dotenv from 'dotenv';

//Load enviroment variables
dotenv.config();

//Configure database connection
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "GymGuru",
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
});

db.connect();//Connect to the database

//Exports
export default db;