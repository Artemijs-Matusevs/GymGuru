import db from '../config/database.js';

const findUserByEmail = async (email) => {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
};

const createUser = async (email, password) => {
    const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *", [emali, password]);
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