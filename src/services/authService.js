import userModel from '../models/userModel.js';

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
const newLocalUser = async (full_name, email, password) => {
    let user = await userModel.findUserByEmail(email);
    if (!user) {
        //Create new user here
    }
    return user;
}

//Find user by ID
const getUserById = async (id) => {
    return await userModel.findUserById(id);
};

//Find user by email
const findUserByEmail = async (email) => {
    return await userModel.findUserByEmail(email);
}

//Verify password
const verifyPassword = async (user, password) => {

};

//exports
export default{
    newGoogleUser,
    newLocalUser,
    getUserById,
    findUserByEmail,
    verifyPassword,
}