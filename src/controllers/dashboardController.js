import dashboardService from '../services/dashboardService.js';

const dashboardController = {

    dashboard: (req, res) => {
        //Get name and current date
        let name = req.user.full_name;
        let date = new Date();
        let month = dashboardService.getMonthText(date.getMonth());

        res.render("dashboard.ejs", {name: name, date: date.getDate(), month: month});
    }
}


//Export
export default dashboardController;