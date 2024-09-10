import dashboardService from '../services/dashboardService.js';

const dashboardController = {

    dashboard: (req, res) => {
        //Get name and current date
        let name = req.user.full_name;
        let date = new Date();
        let month = dashboardService.getMonthText(date.getMonth());
        let message = dashboardService.getWelcomeMessage(date.getHours());

        res.render("dashboard.ejs", {name: name, date: date.getDate(), month: month, message: message});
    },

    dashboardMain: (req, res) => {
        res.render("dashboard-main.ejs");
    },
     
    //Workout section partial
    workout: async (req, res) => {
        //Get list of all the exercises stored in the database
        let exerciseList = await dashboardService.getNamesAllExercises();
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
        await dashboardService.newTemplate(req.user.id, req.body.template_name);
        res.status(200).json({redirectUrl: '/dashboard'});
    }
}


//Export
export default dashboardController;