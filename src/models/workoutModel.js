import db from '../config/database.js';

const getAllExercises = async ()=> {
    const result = await db.query("SELECT * FROM exercises_dataset ORDER BY exercise_name ASC");
    return result.rows;
};

//exports
export default{
    getAllExercises,
}