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

    allExercises.forEach(exercise => {
        exerciseData.push({
            id: exercise.exercise_id,
            name: exercise.exercise_name
        });
    });

    console.log(exerciseData);

    return exerciseData;
};

//Insert new template 
const newTemplate = async (userId, templateName) => {
    const template_id = await workoutModel.addNewWorkoutTemplate(userId, templateName);
    //Template ID
    console.log(template_id);

    //Exercise ID's and position order
};

//Insert new exercise
const newExercise = async (template_id, exercise_id, order_position) => {
    await workoutModel.addNewExercise(template_id, exercise_id, order_position);
    console.log("New exercise added");
};

//exports
export default{
    getMonthText,
    getWelcomeMessage,
    getNamesAllExercises,
    newTemplate,
}
