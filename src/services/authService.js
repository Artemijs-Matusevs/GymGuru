import userModel from '../models/userModel.js';

//new google user
const newGoogleUser = async (profile) => {
    let user = await userModel.findUserByEmail(profile.email);
    if (!user) {
        user = await userModel.createUser(profile.email, 'google');
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