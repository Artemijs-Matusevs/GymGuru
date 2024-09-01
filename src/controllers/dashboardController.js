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
     
    workout: (req, res) => {
        res.render("workout.ejs");
    },

    history: (req, res) => {
        res.render("history.ejs");
    },

    calories: (req, res) => {
        res.render("calories.ejs");
    },

    measurements: (req, res) => {
        res.render("measurements.ejs");
    }
    
}


//Export
export default dashboardController;