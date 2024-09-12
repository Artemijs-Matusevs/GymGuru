import db from '../config/database.js';

const getAllExercises = async ()=> {
    try{
        const result = await db.query(`
            SELECT * 
            FROM exercises_dataset 
            ORDER BY exercise_name ASC`);

        return result.rows;
    }catch(err){
        console.log(`Error getting all exercises from dataset:${err.essage}`);
    }
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
        console.log("Error adding new template to DB", err.message);
    }
};

//Add new exercise to template
const addNewExercise = async(template_id, exercise_id, order_position) => {
    try{
        const result = await db.query(`
                                        INSERT INTO template_exercises (template_id, exercise_id, order_position)
                                        VALUES ($1, $2, $3)
                                        RETURNING template_exercise_id `, [template_id, exercise_id, order_position]);
        return result.rows[0].template_exercise_id;
    }catch(err){
        console.log("Error adding new exercise to template to DB", err.message);
    }
};

//Add new set to template_exercise
const addNewSet = async(template_exercise_id, set_number, weight, previous, reps) => {
    try{
        const result = await db.query(`
                                        INSERT INTO exercise_sets (template_exercise_id, set_number, weight, previous, reps)
                                        VALUES ($1, $2, $3, $4, $5)`, [template_exercise_id, set_number, weight, previous, reps]);
    }catch(err){
        console.log("Error adding new set to DB", err.message);
    }
}

//exports
export default{
    getAllExercises,
    addNewWorkoutTemplate,
    addNewExercise,
    addNewSet,
}