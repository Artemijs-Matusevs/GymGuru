import dashboardService from '../services/dashboardService.js';

const dashboardController = {

    dashboard: (req, res) => {
        //Get name and current date
        let name = req.user.full_name;
        let date = new Date();
        let month = dashboardService.getMonthText(date.getMonth());
        let message = dashboardService.getWelcomeMessage(date.getHours());

        //Get hold if alert message if any
        let alertMessage = req.session.alertMessage;
        req.session.alertMessage = null;//Clear it

        res.render("dashboard.ejs", {name: name, date: date.getDate(), month: month, message: message, alertMessage: alertMessage});
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

        res.render("workout.ejs", {exerciseList: exerciseList});
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
        let alertMessage = `Template '${req.body.template_name}' has been created`
        req.session.alertMessage = alertMessage;
        res.status(200).json({redirectUrl: '/dashboard'});
    }
}


//Export
export default dashboardController;