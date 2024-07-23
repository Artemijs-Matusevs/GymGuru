import userModel from '../models/userModel.js';

//Compare passwords
const comparePasswords = (passwords) => {
    if (passwords[0] == passwords[1]){
        return true;
    }else {
        return false;
    }
}

//New local user
const newLocalUser = async (profile) => {
    //Check to see if passwords match
    if (comparePasswords(profile.password)){
        //Check if user email already exists
        let user = await userModel.findUserByEmail(profile.email);
        if (!user) {
            //CREATE NEW ACCOUNT HERE
            console.log("New user");
        } else{
            //USER ALREADY EXISTS
            console.log("User exists");
        }
    } else{//No match
        console.log("Passwords don't match");
    }
}


//exports
export default{
    newLocalUser,
}