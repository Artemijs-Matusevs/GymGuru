import dashboardService from '../services/dashboardService.js';
import workoutModel from '../models/workoutModel.js';

const dashboardController = {

    dashboard: (req, res) => {
        if(!req.session.progressId){
            //Get name and current date
            let name = req.user.full_name;
            let date = new Date();
            let month = dashboardService.getMonthText(date.getMonth());
            let message = dashboardService.getWelcomeMessage(date.getHours());

            //Get hold if alert message if any
            let alertMessage = req.session.alertMessage;
            req.session.alertMessage = null;//Clear it

            res.render("dashboard.ejs", {name: name, date: date.getDate(), month: month, message: message, alertMessage: alertMessage});
        }else{
            res.redirect(`/get-workout?progress_id=${req.session.progressId}`);
        }

    },


    dashboardMain: (req, res) => {
        res.render("dashboard-main.ejs");
    },
     
    //Workout section partial
    workout: async (req, res) => {
        //Get list of all the exercises stored in the database
        let exerciseList = await dashboardService.getNamesAllExercises();
        //Get all stored user templates
        let userTemplates = await dashboardService.getUserTemplates(req.user.id);

        res.render("workout.ejs", {exerciseList: exerciseList, userTemplates: userTemplates});
    },

    history: (req, res) => {
        res.render("history.ejs");
    },

    calories: (req, res) => {
        res.render("calories.ejs");
    },

    measurements: (req, res) => {
        res.render("measurements.ejs");
    },
    

    //POST new workout template
    newWorkoutTemplate: async (req, res) => {
        //console.log(req.user);
        await dashboardService.newTemplate(req.user.id, req.body.template_name, req.body.exercises);

        //send new alert message
        let alertMessage = `Template '${req.body.template_name}' has been created`;
        req.session.alertMessage = alertMessage;
        res.status(200).json({redirectUrl: '/dashboard'});
    },

    //DELETE workout template
    deleteWorkoutTemplate: async (req, res) => {
        //console.log(req.query.template_id);
        const templateName = await dashboardService.deleteTemplate(req.query.template_id);

        //Send new alert message
        let alertMessage = `Template '${templateName}' has been deleted`;
        req.session.alertMessage = alertMessage;
        res.status(200).json({redirectUrl: '/dashboard'})
    },

    //PUT workout template
    editWorkoutTemplate: async (req, res) => {
        //Get template details
        const newTemplateName = req.body.template_name;
        const templateId = req.body.template_id;
        const exercises = req.body.exercises;

        //Update the template
        const templateName = await dashboardService.updateTemplate(newTemplateName, templateId, exercises);

        //Send new alert message
        let alertMessage = `Template '${templateName}' has been updated`;
        req.session.alertMessage = alertMessage;
        res.status(200).json({redirectUrl: '/dashboard'})

    },

    //GET workout template details
    getWorkoutTemplate: async (req, res) => {
        const template = await dashboardService.getTemplate(req.query.template_id);
        res.status(200).json({template: template});

        //console.log(template[0].sets);
    },

    //Start workout
    startWorkout: async (req, res) => {
        //Start a new workout here and redirect to get current workout
        const templateId = req.body.template_id;
        const userId = req.user.id;

        //Start a new workout
        const progress_id = await dashboardService.startWorkout(userId, templateId);

        //Set up a new workout in the session
        req.session.progressId = progress_id;

        //Redirect
        res.status(200).json({redirectUrl: `/get-workout?progress_id=${progress_id}`});

    },

    //GET current workout
    getCurrentWorkout: async (req, res) => {

        //Get the in progress workout and template IDs
        const progressId = req.query.progress_id;
        const templateId = await workoutModel.getTemplateProgressId(progressId);


        //Get the raw original template
        let templateName = await workoutModel.getTemplateName(templateId);
        let rawTemplate = await dashboardService.getTemplate(templateId);
        //console.log(rawTemplate[0].sets);

        //Get any completed sets
        let completedSets = await workoutModel.getCompletedSets(progressId);

        //Replace any completed sets in the raw template

        //Render the workout
        res.render("current-workout.ejs", {templateName: templateName, template: rawTemplate});
    },

    //Update workout state
    updateCurrentWorkout: async (req, res) => {
        //UPDATE THE IN PROGRESS WORKOUT HERE
    },

    //Cancel workout
    cancelCurrentWorkout: async (req, res) => {
        //Get the progress ID
        const progressId = req.query.progress_id;

        //Delete the entry in DB
        workoutModel.deleteCurrentWorkout(progressId);

        //Reset progressID in session
        req.session.progressId = null;
        req.session.alertMessage = `Workout with ID:${progressId}, cancelled`;

        //Redirect
        res.status(200).json({redirectUrl: `/dashboard`});
    }
}


//Export
export default dashboardController;