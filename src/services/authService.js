import userModel from '../models/userModel.js';
import bcrypt from "bcrypt";

//bcrypt variables
const saltRounds = 10;

//new google user
const newGoogleUser = async (profile) => {
    //Check to see if the email already exists
    let user = await userModel.findUserByEmail(profile.email);
    if (!user) {
        let name = profile.given_name + " " + profile.family_name;//Get full name
        user = await userModel.createUser(name, profile.email, 'google');
        //console.log(profile);
    }
    return user;
}

//new local user
const newLocalUser = async (profile) => {
    let user = await userModel.findUserByEmail(profile.email);

    if(user){
        return("user exists");
    }else if(!comparePasswords(profile.password)){
        return("no match");
    }else{
        //CREATE USER HERE
        //console.log(profile);

        //Hash the password
        const password = profile.password[0];

        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                console.error("Error hashing password:", err);
            } else {
                //Store in the users table
                await userModel.createUser(profile.full_name, profile.email, hash);
            }
        })
    }
};

//Find user by ID
const getUserById = async (id) => {
    return await userModel.findUserById(id);
};

//Find user by email
const findUserByEmail = async (email) => {
    return await userModel.findUserByEmail(email);
};

//Verify password
const verifyPassword = async (user, password) => {
    try {
        //Compare the provided password with stored hash
        const match = await bcrypt.compare(password, user.password);
        return match;
    } catch (err) {
        console.log(err);
        return false;
    }
};

//Compare passwords
const comparePasswords = (passwords) => {
    return passwords[0] === passwords[1];
};

//exports
export default{
    newGoogleUser,
    newLocalUser,
    getUserById,
    findUserByEmail,
    verifyPassword,
}