import userModel from '../models/userModel.js';
import workoutModel from '../models/workoutModel.js';

//Convert month digit to textual representation
const getMonthText = (month) => {
    switch (month) {
        case 0:
            return "Jan";
        case 1:
            return "Feb";
        case 2:
            return "Mar";
        case 3:
            return "Apr"
        case 4:
            return "May"
        case 5:
            return "June"
        case 6:
            return "July"
        case 7:
            return "Aug"
        case 8:
            return "Sept"
        case 9:
            return "Oct"
        case 10:
            return "Nov"
        case 11:
            return "Dec"
        default: //For unexpected values
            return "Err"
    }
};

//Get welcome message
const getWelcomeMessage = (time) => {
    //console.log(time);

    if(time > 4 && time < 12){
        return("Good Morning");
    }else if(time > 11 && time < 18){
        return("Good Afternoon");
    }else{
        return("Good Evening");
    }
}


//Get names of all exercises
const getNamesAllExercises = async () => {
    let allExercises = await workoutModel.getAllExercises();
    let exerciseData = [];

    //Create object to store each exercise name and it's id
    allExercises.forEach(exercise => {
        exerciseData.push({
            id: exercise.exercise_id,
            name: exercise.exercise_name
        });
    });
    return exerciseData;
};

//Insert new template 
const newTemplate = async (userId, templateName, exerciseData) => {
    //Add the new template to the templates table (returns template_id)
    const template_id = await workoutModel.addNewWorkoutTemplate(userId, templateName);
    console.log(`New template added, template name:${templateName}`);

    //Add each exercise in the template to the template_exercises table
    //console.log(exerciseData[0].sets);
    if(Array.isArray(exerciseData) && exerciseData.length > 0)
    {
        exerciseData.forEach(async exercise => {
            const template_exercise_id = await newExercise(template_id, exercise.id, exercise.order);
    
            //Add each set of the exercise to the sets table
            if(Array.isArray(exercise.sets) && exercise.sets.length > 0){
                exercise.sets.forEach(set => {
                    //console.log(set.setNumber, set.weight, set.previous, set.reps);
                    newSet(template_exercise_id, set.setNumber, set.weight, set.previous, set.reps);
                });
            }
        });
    }
};


//Get list of all user templates
const getUserTemplates = async (user_id) => {
    //Get template names
    let templates = await workoutModel.fetchUserTemplates(user_id);
    //console.log(templates);

    //Empty object to store saved template
    let templatesData = [];

    //Get exercise data for each workout template and build a js object (if there is any templates saved)
    if(Array.isArray(templates) && templates.length > 0){

        //Wait for all queries to finish
        templatesData = await Promise.all(

            //Loop through each template
            templates.map(async template => {
                //Build a temp object for each template
                let tempObj = {
                    template_id: template.template_id,
                    template_name: template.template_name,
                }

                //Get list of all the exercises for specific template
                let exercises = await workoutModel.fetchTemplateExercises(template.template_id);

                //If there are any exercises, add the name and number of sets to the tempObj
                if(Array.isArray(exercises) && exercises.length > 0){
                    //Wait for all db queries to be returned
                    tempObj.exercises = await Promise.all(
                        tempObj.exercises = exercises.map(async (exercise) => ({
                            exercise_name: exercise.exercise_name,
                            number_of_sets: await workoutModel.fetchNumOfSets(exercise.template_exercise_id)
                        }))
                    );
                };
                
                return tempObj;

            })
        );
    }

    //Testing
    //console.log(templateData[0].exercises);
    return templatesData;
}   


//NOT EXPORTS
//Insert new exercise
const newExercise = async (template_id, exercise_id, order_position) => {
    let id = await workoutModel.addNewExercise(template_id, exercise_id, order_position);
    console.log(`New exercise added, exercise_id:${exercise_id}`);
    return id;
};

//Insert new set
const newSet = async (template_exercise_id, set_number, weight, previous, reps) => {
    await workoutModel.addNewSet(template_exercise_id, set_number, weight, previous, reps);
    console.log(`New set added, set number:${set_number}`);
}



//exports
export default{
    getMonthText,
    getWelcomeMessage,
    getNamesAllExercises,
    newTemplate,
    getUserTemplates,
}
