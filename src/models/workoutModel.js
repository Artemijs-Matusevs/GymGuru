import db from '../config/database.js';

const getAllExercises = async ()=> {
    const result = await db.query("SELECT * FROM exercises_dataset ORDER BY exercise_name ASC");
    return result.rows;
};

//Create new record for the new workout template
const addNewWorkoutTemplate = async(user_id, template_name) => {
    try{
        const result = await db.query(`
                                        INSERT INTO workout_templates (user_id, template_name)
                                        VALUES ($1, $2)
                                        RETURNING template_id`, [user_id, template_name]);
        //console.log("New workout template created");
        return result.rows[0].template_id;
    }catch(err){
        console.log(`error in addNewWorkoutTemplate SQL query: ${err.message}`);
    }
};

//Add new exercise to template
const addNewExercise = async(template_id, exercise_id, order_position) => {
    try{
        const result = await db.query(```
                                        INSERT INTO template_exercises (template_id, exercise_id, order_position)
                                        VALUES ($1, $2, $3) ```, [template_id, exercise_id, order_position]);
    }catch(err){
        console.log(err.message);
    }
}

//exports
export default{
    getAllExercises,
    addNewWorkoutTemplate,
    addNewExercise,
}