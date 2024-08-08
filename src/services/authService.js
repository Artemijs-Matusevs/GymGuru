import userModel from '../models/userModel.js';

//new google user
const newGoogleUser = async (profile) => {
    let user = await userModel.findUserByEmail(profile.email);
    if (!user) {
        let name = profile.given_name + " " + profile.family_name;//Get full name
        user = await userModel.createUser(name, profile.email, 'google');
        //console.log(profile);
    }
    return user;
}

//Find user by ID
const getUserById = async (id) => {
    return await userModel.findUserById(id);
};

//exports
export default{
    newGoogleUser,
    getUserById,
}