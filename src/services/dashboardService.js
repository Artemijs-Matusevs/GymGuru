import userModel from '../models/userModel.js';

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
    }else if(time > 12 && time < 17){
        return("Good Afternoon");
    }else{
        return("Good Evening");
    }
}


//exports
export default{
    getMonthText,
    getWelcomeMessage,
}
