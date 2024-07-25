import db from '../config/database.js';

const findUserByEmail = async (email) => {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
};

const createUser = async (full_name, email, username, password) => {
    const result = await db.query("INSERT INTO users (full_name, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *", [full_name, email, username, password]);
    return result.rows[0];
};

const findUserById = async (id) => {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
};


//exports
export default{
    findUserByEmail,
    createUser,
    findUserById
};