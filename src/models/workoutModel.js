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
};

//Feth all templates for a user
const fetchUserTemplates = async(user_id) => {
    try{
        const result = await db.query(`
                                        SELECT *
                                        FROM workout_templates
                                        WHERE user_id = $1
                                        ORDER BY template_name ASC`, [user_id]);
        return result.rows;
    }catch(err){
        console.log(`Error fetching templates for user ${err.message}`);
    }
}

//Fetch all exercises for a specific template
const fetchTemplateExercises = async(template_id) => {
    try{
        const result = await db.query(`
                                        SELECT e.exercise_name, te.template_exercise_id
                                        FROM template_exercises te
                                        JOIN exercises_dataset e ON te.exercise_id = e.exercise_id
                                        WHERE te.template_id = $1
                                        ORDER BY te.order_position;
                                        `, [template_id]);
        return result.rows;
    }catch(err){
        console.log(`Error fetching template exercises: ${err.message}`);
    }
}

//Fetch number of sets for a specific template exercise
const fetchNumOfSets = async(template_exercise_id) => {
    try{
        const result = await db.query(`
                                        SELECT template_exercise_id, COUNT(*) AS sets
                                        FROM exercise_sets
                                        WHERE template_exercise_id = $1
                                        GROUP BY template_exercise_id;`, [template_exercise_id]);
        return result.rows[0].sets;
    }catch(err){
        console.log(`Error fetching number of sets for exercise: ${err.message}`);
    }
}

//exports
export default{
    getAllExercises,
    addNewWorkoutTemplate,
    addNewExercise,
    addNewSet,
    fetchUserTemplates,
    fetchTemplateExercises,
    fetchNumOfSets
}