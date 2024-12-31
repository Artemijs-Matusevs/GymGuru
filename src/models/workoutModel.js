import db from '../config/database.js';

//Retrieve list of all stored exercises in the db
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
const addNewSet = async(template_exercise_id, set_number, weight, reps) => {
    try{
        const result = await db.query(`
                                        INSERT INTO exercise_sets (template_exercise_id, set_number, weight, reps)
                                        VALUES ($1, $2, $3, $4)`, [template_exercise_id, set_number, weight, reps]);
    }catch(err){
        console.log("Error adding new set to DB", err.message);
    }
};

//DELETION
//Delete all sets of a template exercise
const deleteAllSets = async(template_exercise_id) => {
    try{
        const result = await db.query(`
                                        DELETE FROM exercise_sets
                                        WHERE template_exercise_id = $1`, [template_exercise_id]);
    }catch(err){
        console.log("Error deleting sets", err);
    }
};

//Delete all exercises
const deleteAllExercises = async(template_id) => {
    try{
        const result = await db.query(`
                                        DELETE FROM template_exercises
                                        WHERE template_id = $1`, [template_id]);
    }catch(err){
        console.log("Error deleting exercises", err);
    }
};

const deleteTemplate = async(template_id) => {
    try{
        const result = await db.query(`
                                        DELETE FROM workout_templates
                                        WHERE template_id = $1
                                        RETURNING template_name`, [template_id]);
        return result.rows[0].template_name;
    }catch(err){
        console.log("Error deleting template", err);
    }
}

//Delete specificexercise by ID
const deleteExercise = async(exercise_id) => {
    try{
        const result = await db.query(`
                                        DELETE FROM template_exercises
                                        WHERE template_exercise_id = $1`, [exercise_id]);
    }catch(err){
        console.log("Error deleting specific exercises", err);
    }
}


//FETCHING
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
                                        SELECT e.exercise_name, te.template_exercise_id, te.order_position
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

//Fetch all sets for a saved template exercise
const fetchAllSets = async(template_exercise_id) => {
    try{
        const result = await db.query(`
                                        SELECT *
                                        FROM exercise_sets
                                        WHERE template_exercise_id = $1
                                        ORDER BY set_number ASC;`, [template_exercise_id]);
        return result.rows;
    }catch(err){
        console.log(`Error fetching all sets for specific exercise: ${err.message}`);
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

//UPDATE
const updateTemplateName = async(template_name, template_id) => {
    try{
        const result = await db.query(`
                                        UPDATE workout_templates
                                        SET template_name = $1
                                        WHERE template_id = $2
                                        RETURNING template_name`, [template_name, template_id]);
        return result.rows[0].template_name;
    }catch(err){
        console.log(`Error updating name of template: ${err.message}`);
    }
}

//START A NEW IN PROGRESS WORKOUT
const startWorkout = async(user_id, template_id) => {
    try{
        const result = await db.query(`
                                        INSERT INTO in_progress_workouts (user_id, template_id)
                                        VALUES ($1, $2)
                                        RETURNING progress_id`, [user_id, template_id]);
        return result.rows[0].progress_id;
    }catch(err){
        console.log(`Error starting a new workout: ${err.message}`);
    }
}

//Add a completed set
const finishSet = async(template_exercise_id, progress_id, set_number, weight, reps) => {
    try{
        const result = await db.query(`
                                        INSERT INTO exercise_history_sets
                                        VALUES ($1, $2, $3, $4, $5)` [template_exercise_id, progress_id, set_number, weight, reps]);                             
    }catch(err){
        console.log(`Error adding a finished set: ${err.message}`);
    }
}

//Get the template ID from the progress workouts
const getTemplateProgressId = async(progress_id) => {
    try{
        const result = await db.query(`
                                        SELECT template_id
                                        FROM in_progress_workouts
                                        WHERE progress_id = $1`, [progress_id]);
        return result.rows[0].template_id;
    }catch(err){
        console.log(`Error fetching template ID of an in-progress workout: ${err.message}`);
    }
}

//Get template name
const getTemplateName = async(template_id) => {
    try{
        const result = await db.query(`
                                       SELECT template_name
                                       FROM workout_templates
                                       WHERE template_id = $1`, [template_id]);
        return result.rows[0].template_name;
    }catch(err){
        console.log(`Error fetching name of template: ${err.message}`);
    }
}

//Get completed sets
const getCompletedSets = async(progress_id) => {
    try{
        const result = await db.query(`
                                        SELECT *
                                        FROM exercise_history_sets
                                        WHERE progress_id = $1`, [progress_id]);
        return result.rows;
    }catch(err){
        console.log(`Error, could fetch all compelted sets: ${err.message}`);
    }
}

//Add new completed set
const addCompletedSet = async(exercise_id, progress_id, set_number, weight, reps) =>{
    //ADD NEW SETS HERE
}

//exports
export default{
    getAllExercises,
    addNewWorkoutTemplate,
    addNewExercise,
    addNewSet,
    fetchUserTemplates,
    fetchTemplateExercises,
    fetchNumOfSets,
    deleteAllSets,
    deleteAllExercises,
    deleteTemplate,
    fetchAllSets,
    updateTemplateName,
    deleteExercise,
    startWorkout,
    finishSet,
    getTemplateProgressId,
    getTemplateName,
    getCompletedSets,
}