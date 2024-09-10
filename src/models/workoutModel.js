import db from '../config/database.js';

const getAllExercises = async ()=> {
    const result = await db.query("SELECT * FROM exercises_dataset ORDER BY exercise_name ASC");
    return result.rows;
};

//Create new record for the new workout template
const addNewWorkoutTemplate = async(user_id, template_name) => {
    try{
        const result = await db.query("INSERT INTO workout_templates (user_id, template_name) VALUES ($1, $2)", [user_id, template_name]);
        //console.log("New workout template created");
    }catch(err){
        console.log(err.message);
    }
}

//exports
export default{
    getAllExercises,
    addNewWorkoutTemplate,
}