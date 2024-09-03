import db from '../config/database.js';

const getAllExercises = async ()=> {
    const result = await db.query("SELECT * FROM exercises_dataset");
    return result.rows;
};

//exports
export default{
    getAllExercises,
}